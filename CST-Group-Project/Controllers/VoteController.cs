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

namespace CST_Group_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly MyDatabaseContext _context;

        public VoteController(MyDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Vote
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vote>>> GetAllVotes(int limit = 100)
        {
            List<Vote> ans = await _context.Vote.ToListAsync();
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/Vote/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vote>> GetVote(int id)
        {
            var vote = await _context.Vote.FindAsync(id);

            if (vote == null)
            {
                return NotFound();
            }

            return vote;
        }

        // PUT: api/Vote/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVote(int id, Vote vote)
        {
            if (id != vote.Id)
            {
                return BadRequest();
            }

            _context.Entry(vote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoteExists(id))
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

        // POST: api/Vote
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Vote>> PostVote(Vote vote)
        {
            if (vote.Created == null) vote.Created = DateTimeOffset.UtcNow;
            List<Vote> lst = await _context.Vote.ToListAsync();
            Answer answer;
            Answer initial = await _context.Answer.FindAsync(vote.AnswerId);
            foreach (var v in lst)
            {
                if (v.PersonName == vote.PersonName)
                {
                    answer = await _context.Answer.FindAsync(v.AnswerId);
                    if (answer.PollId == initial.PollId)
                    {
                        _context.Vote.Remove(v);
                        answer.Votes--;
                        _context.Entry(answer).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                        if (answer.Id == initial.Id)
                        {
                            return CreatedAtAction("RemoveVote", v);
                        }
                    }
                }
            }
            answer = await _context.Answer.FindAsync(vote.AnswerId);
            answer.Votes++;
            _context.Entry(answer).State = EntityState.Modified;
            _context.Vote.Add(vote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVote", new { id = vote.Id }, vote);
        }

        // DELETE: api/Vote/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVote(int id)
        {
            var vote = await _context.Vote.FindAsync(id);
            if (vote == null)
            {
                return NotFound();
            }

            _context.Vote.Remove(vote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VoteExists(int id)
        {
            return _context.Vote.Any(e => e.Id == id);
        }
    }
}
