using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CST_Group_Project.Data;
using CST_Group_Project.Models;
using Microsoft.AspNetCore.Authorization;

namespace CST_Group_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkUserTopicController : ControllerBase
    {
        private readonly MyDatabaseContext _context;

        public LinkUserTopicController(MyDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/LinkUserTopic
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinkUserTopic>>> GetAllLinksUserTopic(int limit = 100)
        {
            List<LinkUserTopic> ans = await _context.LinkUserTopic.ToListAsync();
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET:  api/LinkUserTopic/Person/hater
        [HttpGet("Person/{PersonName}")]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopics_PersonName(string PersonName, int limit = 100, int boundary = 0)
        {
            List<Topic> topics = await _context.Topic.ToListAsync();
            List<Topic> ans = new List<Topic>();
            if (PersonName != null)
            {
                List<LinkUserTopic> lst = await _context.LinkUserTopic.ToListAsync();
                HashSet<int> topicsIds = new HashSet<int>();
                foreach (var link in lst)
                {
                    if (link.PersonName == PersonName) topicsIds.Add(link.TopicId);
                }
                foreach (var topic in topics)
                {
                    if (topic.Id > boundary){
                        if (topicsIds.Contains(topic.Id) || topic.OpenFlag == true) ans.Add(topic);
                    }
                }
            }
            else
            {
                
                foreach (var topic in topics)
                {
                    if (topic.Id > boundary){
                        if (topic.OpenFlag == true) ans.Add(topic);
                    }
                }
            }
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET:  api/LinkUserTopic/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LinkUserTopic>> GetLink(int id)
        {
            var link = await _context.LinkUserTopic.FindAsync(id);

            if (link == null)
            {
                return NotFound();
            }

            return link;
        }

        // PUT:  api/LinkUserTopic/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLink(int id, LinkUserTopic link)
        {
            if (id != link.Id)
            {
                return BadRequest();
            }

            _context.Entry(link).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LinkExists(id))
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

        // POST: api/LinkUserTopic
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<LinkUserTopic>> PostLink(LinkUserTopic link)
        {
            if (link.Created == null) link.Created = DateTimeOffset.UtcNow;
            _context.LinkUserTopic.Add(link);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLink", new { id = link.Id }, link);
        }

        // DELETE: api/LinkUserTopic/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLink(int id)
        {
            var link = await _context.LinkUserTopic.FindAsync(id);
            if (link == null)
            {
                return NotFound();
            }

            _context.LinkUserTopic.Remove(link);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LinkExists(int id)
        {
            return _context.LinkUserTopic.Any(e => e.Id == id);
        }
    }
}
