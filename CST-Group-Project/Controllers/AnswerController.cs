using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CST_Group_Project.Data;
using CST_Group_Project.Models;
using CST_Group_Project.Helpers;
using Microsoft.AspNetCore.Authorization;
using JWTAuthentication.Authentication;

namespace CST_Group_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly MyDatabaseContext _context;

        public AnswerController(MyDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Answer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAllAnswers(int limit = 100)
        {
            List<Answer> ans = await _context.Answer.ToListAsync();
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/Answer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Answer>> GetAnswer(int id)
        {
            if (await AnswerHelper.GetAnswer(id, _context) == null) return NotFound();
            return await AnswerHelper.GetAnswer(id, _context);
        }

        // GET: api/Answer/Poll/5
        [HttpGet("Poll/{PollId}")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswersByPoll(int PollId, int limit = 100)
        {
            List<Answer> lst = await _context.Answer.ToListAsync();
            List<Answer> ans = new List<Answer>();
            foreach (var answer in lst)
            {
                if (answer.PollId == PollId) ans.Add(answer);
            }
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;

        }

        // GET: api/Answer/Poll/PersonName/5/hater
        [HttpGet("PersonName/{PollId}/{PersonName}")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswersByPollIdAndName(int PollId, string PersonName, int limit = 100)
        {
            List<Answer> lst = await _context.Answer.ToListAsync();
            List<Vote> votes = await _context.Vote.ToListAsync();
            HashSet<int> sol = new HashSet<int>();
            List<Answer> ans = new List<Answer>();
            foreach (var vote in votes)
            {
                if (vote.PersonName == PersonName) sol.Add(vote.AnswerId);
            }
            foreach (var answer in lst)
            {
                if (answer.PollId == PollId && sol.Contains(answer.Id)) ans.Add(answer);
            }
            
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;

        }

        // PUT: api/Answer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnswer(int id, Answer answer)
        {
            if (id != answer.Id)
            {
                return BadRequest();
            }

            _context.Entry(answer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Answer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Answer>> PostAnswer(Answer answer)
        {
            if (answer.Created == null) answer.Created = DateTimeOffset.UtcNow;
            if (answer.Votes == null) answer.Votes = 0;
            await AnswerHelper.AddAnswer(answer, _context);
            return CreatedAtAction("GetAnswer", new { id = answer.Id }, answer);
        }

        // DELETE: api/Answer/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnswer(int id)
        {
            if (await AnswerHelper.RemoveAnswer(id,_context)) return NoContent();
            return NotFound();
        }

        private bool AnswerExists(int id)
        {
            return _context.Answer.Any(e => e.Id == id);
        }
    }
}
