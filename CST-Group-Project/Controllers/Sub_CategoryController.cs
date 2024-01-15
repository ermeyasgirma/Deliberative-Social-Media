using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CST_Group_Project.Data;
using Microsoft.AspNetCore.Authorization;
using CST_Group_Project.Models;
using JWTAuthentication.Authentication;

namespace CST_Group_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sub_CategoryController : ControllerBase
    {
        private readonly MyDatabaseContext _context;

        public Sub_CategoryController(MyDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Sub_Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sub_Category>>> GetAllSub_Categories(int limit = 100)
        {
            List<Sub_Category> ans = await _context.Sub_Category.ToListAsync();
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/Topic/1
        [HttpGet("Topic/{topicId}")]
        public async Task<ActionResult<IEnumerable<Sub_Category>>> GetSub_Category_Topic(int topicId, int limit = 100)
        {
            List<Sub_Category> lst = await _context.Sub_Category.ToListAsync();
            List<Sub_Category> ans = new List<Sub_Category>();
            foreach (var subcateg in lst)
            {
               if (subcateg.Parent == topicId) ans.Add(subcateg);
            }
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/Sub_Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sub_Category>> GetSub_Category(int id)
        {
            var sub_Category = await _context.Sub_Category.FindAsync(id);

            if (sub_Category == null)
            {
                return NotFound();
            }

            return sub_Category;
        }

        // PUT: api/Sub_Category/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSub_Category(int id, Sub_Category sub_Category)
        {
            if (id != sub_Category.Id)
            {
                return BadRequest();
            }

            _context.Entry(sub_Category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Sub_CategoryExists(id))
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

        // POST: api/Sub_Category
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        public async Task<ActionResult<Sub_Category>> PostSub_Category(Sub_Category sub_Category)
        {
            if (sub_Category.Created == null) sub_Category.Created = DateTimeOffset.UtcNow;
            _context.Sub_Category.Add(sub_Category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSub_Category", new { id = sub_Category.Id }, sub_Category);
        }

        // DELETE: api/Sub_Category/5
        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSub_Category(int id)
        {
            var sub_Category = await _context.Sub_Category.FindAsync(id);
            if (sub_Category == null)
            {
                return NotFound();
            }

            _context.Sub_Category.Remove(sub_Category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Sub_CategoryExists(int id)
        {
            return _context.Sub_Category.Any(e => e.Id == id);
        }
    }
}
