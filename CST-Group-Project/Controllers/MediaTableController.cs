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
using CST_Group_Project.Helpers;
using Microsoft.Extensions.Options;

namespace CST_Group_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaTableController : ControllerBase
    {
        private readonly AzureStorageConfig storageConfig = null;
        private readonly MyDatabaseContext _context;

        public MediaTableController(IOptions<AzureStorageConfig> config, MyDatabaseContext context)
        {
            storageConfig = config.Value;
            _context = context;
        }

        // GET: api/MediaTable
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MediaTable>>> GetAllMediaEntries(int limit = 100)
        {
            List<MediaTable> ans = await _context.MediaTable.ToListAsync();
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/MediaTable/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MediaTable>> GetMediaTable(int id)
        {
            var mediaTable = await _context.MediaTable.FindAsync(id);

            if (mediaTable == null)
            {
                return NotFound();
            }

            return mediaTable;
        }

        // GET: api/MediaTable/TopicId/5
        [HttpGet("Topic/{TopicId}")]
        public async Task<ActionResult<IEnumerable<MediaTable>>> GetMediaTableByTopic(int TopicId, int limit = 100)
        {
            List<MediaTable> lst = await _context.MediaTable.ToListAsync();
            List<MediaTable> ans = new List<MediaTable>();
            foreach (var media in lst)
            {
                if (media.TopicId == TopicId) ans.Add(media);
            }
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // GET: api/MediaTable/PostId/5
        [HttpGet("Post/{PostId}")]
        public async Task<ActionResult<IEnumerable<MediaTable>>> GetMediaTableByPost(int PostId, int limit = 100)
        {
            List<MediaTable> lst = await _context.MediaTable.ToListAsync();
            List<MediaTable> ans = new List<MediaTable>();
            foreach (var media in lst)
            {
                if (media.PostId == PostId) ans.Add(media);
            }
            if (limit < ans.Count) return ans.GetRange(0, limit);
            return ans;
        }

        // PUT: api/MediaTable/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMediaTable(int id, MediaTable mediaTable)
        {
            if (id != mediaTable.Id)
            {
                return BadRequest();
            }

            _context.Entry(mediaTable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MediaTableExists(id))
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

        // POST: api/MediaTable
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<MediaTable>> PostMediaTable(MediaTable mediaTable)
        {
            if (mediaTable.Created == null) mediaTable.Created = DateTimeOffset.UtcNow;
            _context.MediaTable.Add(mediaTable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMediaTable", new { id = mediaTable.Id }, mediaTable);
        }

        // DELETE: api/MediaTable/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMediaTable(int id)
        {
            var mediaTable = await _context.MediaTable.FindAsync(id);
            if (mediaTable == null)
            {
                return NotFound();
            }

            await StorageHelper.RemoveFileFromStorage(mediaTable.Id.ToString(), storageConfig);
            _context.MediaTable.Remove(mediaTable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MediaTableExists(int id)
        {
            return _context.MediaTable.Any(e => e.Id == id);
        }
    }
}
