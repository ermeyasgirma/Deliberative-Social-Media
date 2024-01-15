using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CST_Group_Project.Data;
using CST_Group_Project.Controllers;
using CST_Group_Project.Models;
using CST_Group_Project.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace CST_Group_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly MyDatabaseContext _context;

        public ReactionController(MyDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Reaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reaction>>> GetAllReactions(int limit = 100)
        {
            List<Reaction> ans = await _context.Reaction.ToListAsync();
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/Person/Hater
        [HttpGet("Likes/{PersonName}")]
        public async Task<ActionResult<IEnumerable<Reaction>>> GetLikes_PersonName(string PersonName, int limit = 100)
        {
            List<Reaction> lst = await _context.Reaction.ToListAsync();
            List<Reaction> ans = new List<Reaction>();
            foreach (var reaction in lst)
            {
                if (reaction.PersonName == PersonName && reaction.Reacted == "Like") ans.Add(reaction);
            }
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/Person/MapReactions/Hater
        [HttpGet("MapReactions/{PersonName}")]
        public async Task<ActionResult<Dictionary<int, List<Reaction>>>> MapReactionsByPostIdForPerson(string PersonName)
        {
            Dictionary<int, List<Reaction> > ans = new Dictionary<int, List<Reaction>>();
            List<Reaction> lst = await _context.Reaction.ToListAsync();
            foreach (var reaction in lst)
            {
                if (reaction.PersonName == PersonName)
                {
                    List<Reaction> val = new List<Reaction>();
                    if (ans.ContainsKey(reaction.PostId))
                    {
                        val = ans[reaction.PostId];
                        val.Add(reaction);
                        ans[reaction.PostId] = val;
                    }
                    else
                    {
                        val.Add(reaction);
                        ans.Add(reaction.PostId,val);
                    }
                }
            }
            return ans;
        }

        // GET: api/Person/Hater
        [HttpGet("Dislikes/{PersonName}")]
        public async Task<ActionResult<IEnumerable<Reaction>>> GetDislikes_PersonName(string PersonName, int limit = 100)
        {
            List<Reaction> lst = await _context.Reaction.ToListAsync();
            List<Reaction> ans = new List<Reaction>();
            foreach (var reaction in lst)
            {
                if (reaction.PersonName == PersonName && reaction.Reacted == "Dislike") ans.Add(reaction);
            }
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/Person/Hater
        [HttpGet("CMM/{PersonName}")]
        public async Task<ActionResult<IEnumerable<Reaction>>> GetCMM_PersonName(string PersonName, int limit = 100)
        {
            List<Reaction> lst = await _context.Reaction.ToListAsync();
            List<Reaction> ans = new List<Reaction>();
            foreach (var reaction in lst)
            {
                if (reaction.PersonName == PersonName && reaction.Reacted == "CMM") ans.Add(reaction);
            }
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/Reaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reaction>> GetReaction(int id)
        {
            var reaction = await _context.Reaction.FindAsync(id);

            if (reaction == null)
            {
                return NotFound();
            }

            return reaction;
        }

        // PUT: api/Reaction/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReaction(int id, Reaction reaction)
        {
            if (id != reaction.Id)
            {
                return BadRequest();
            }

            _context.Entry(reaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReactionExists(id))
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

        // POST: api/Reaction
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Reaction>> PostReaction(Reaction reaction)
        {
            List<Reaction> lst = await _context.Reaction.ToListAsync();
            Post searched = await _context.Post.FindAsync(reaction.PostId);
            foreach (var react in lst)
            {
                if (react.PersonName == reaction.PersonName && react.PostId == reaction.PostId && react.Reacted == reaction.Reacted)
                {
                    _context.Reaction.Remove(react);
                    if (reaction.Reacted == "Like") searched.Likes--;
                    else if (reaction.Reacted == "Dislike") searched.Dislikes--;
                    else searched.CMM--;
                    await PostHelper.PutPost(searched, _context);
                    await _context.SaveChangesAsync();
                    return CreatedAtAction("RemoveReaction", react);
                }    
                if ( (react.PersonName == reaction.PersonName && react.PostId == reaction.PostId) && ((react.Reacted == "Like" && reaction.Reacted == "Dislike") || (react.Reacted == "Dislike" && reaction.Reacted == "Like")))
                {
                    _context.Reaction.Remove(react);
                    if (react.Reacted == "Like") searched.Likes--;
                    else if (react.Reacted == "Dislike") searched.Dislikes--;
                    else searched.CMM--;
                    break;
                }
            }
            if (reaction.Created == null) reaction.Created = DateTimeOffset.UtcNow;
            _context.Reaction.Add(reaction);
            if (reaction.Reacted == "Like") searched.Likes++;
            else if (reaction.Reacted == "Dislike") searched.Dislikes++;
            else searched.CMM++;
            await PostHelper.PutPost(searched, _context);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReaction", new { id = reaction.Id }, reaction);
        }

        // DELETE: api/Reaction/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReaction(int id)
        {
            var reaction = await _context.Reaction.FindAsync(id);
            if (reaction == null)
            {
                return NotFound();
            }

            _context.Reaction.Remove(reaction);
            Post post = await _context.Post.FindAsync(reaction.PostId);
            if (reaction.Reacted == "Like") post.Likes--;
            else if (reaction.Reacted == "Dislike") post.Dislikes--;
            else post.CMM--;
            await PostHelper.PutPost(post, _context);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Reaction/1/5
        [Authorize]
        [HttpDelete("{personName}/{postId}")]
        public async Task<IActionResult> DeleteReactionByPersonAndPost(string personName, int postId)
        {
            List<Reaction> lst = await _context.Reaction.ToListAsync();
            foreach (var react in lst)
                if (react.PostId == postId && react.PersonName == personName)
                {
                    await DeleteReaction(react.Id);
                    await _context.SaveChangesAsync();
                    return NoContent();
                }
            return NotFound();
        }

        private bool ReactionExists(int id)
        {
            return _context.Reaction.Any(e => e.Id == id);
        }
    }
}
