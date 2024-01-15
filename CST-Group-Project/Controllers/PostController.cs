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
using System.Net.Http;
using CST_Group_Project.Helpers;

namespace CST_Group_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly MyDatabaseContext _context;

        public PostController(MyDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Post
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetAllPosts(int limit = 100)
        {
            List<Post> ans = await _context.Post.ToListAsync();
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/Sub_Category/1
        [HttpGet("Sub_Category/{Id}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPost_Sub_Category_Id(int Id, int limit = 100)
        {
            List<Post> lst = await _context.Post.ToListAsync();
            List<Post> ans = new List<Post>();
            foreach (var post in lst)
            {
                if (post.Subcategory == Id) ans.Add(post);
            }
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }


        // Posts in a certain time range are displayed in ascending order by date (oldest to newest)
        // GET: api/TimeRange
        [HttpGet("TimeRange")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPost_TimeRange(DateTimeOffset start, DateTimeOffset end, int limit  = 100)
        {
            List<Post> lst = await _context.Post.ToListAsync();
            List<Post> ans = new List<Post>();
            foreach (var post in lst)
            {
                if (post.Created == null) continue;
                if (post.Created >= start && post.Created <= end) ans.Add(post);
            }
            ans.Sort(delegate (Post x, Post y) 
            {
                if (x.Created < y.Created) return 0;
                return 1;
            });
            if (limit < ans.Count)return ans.GetRange(0,limit);
            return ans;
        }

        [HttpGet("Person")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPost_Preson(Person author, int limit = 100)
        {
            var tmp = _context.Post.Where(post => post.Creator.Equals(author.Name));
            tmp.OrderBy(post => post.Created);
            return await tmp.Take(limit).ToListAsync();
        }

        [HttpGet("Creator/{author}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPost_Creator(string author, int limit = 100)
        {
            var tmp = _context.Post.Where(post => post.Creator.Equals(author));
            tmp.OrderBy(post => post.Created);
            return await tmp.Take(limit).ToListAsync();
        }

        // GET: api/Post/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _context.Post.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/Post/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
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

        // POST: api/Post
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
            if (post.Created == null) post.Created = DateTimeOffset.UtcNow;
            if (post.CMM == null) post.CMM = 0;
            if (post.Likes == null) post.Likes = 0;
            if (post.Dislikes == null) post.Dislikes = 0;
            if (post.CommentsEnabled == null) post.CommentsEnabled = true;
            if (post.Type == null) post.Type = "TEXT";
            if (post.Type == "TEXT")
            {
                string ans = await PostHelper.Get(post.Body);
                if (ans.StartsWith('t')) post.Flag = true;
                else post.Flag = false;
            }
            _context.Post.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPost", new { id = post.Id }, post);
        }

        // DELETE: api/Post/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Post.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Post.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return _context.Post.Any(e => e.Id == id);
        }
    }
}
