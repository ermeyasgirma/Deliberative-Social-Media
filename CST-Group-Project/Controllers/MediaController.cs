using CST_Group_Project.Helpers;
using CST_Group_Project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using CST_Group_Project.Data;

namespace CST_Group_Project.Controllers
{
    [Route("api/[controller]")]
    public class MediaController : Controller
    {
        // make sure that appsettings.json is filled with the necessary details of the azure storage
        private readonly AzureStorageConfig storageConfig = null;
        private readonly MyDatabaseContext _context;

        public MediaController(IOptions<AzureStorageConfig> config, MyDatabaseContext context)
        {
            storageConfig = config.Value;
            _context = context;
        }

        // POST /api/media/upload
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> Upload(ICollection<IFormFile> files, int? postId, int? topicId)
        {
            bool isUploaded = false;

            try
            {
                if (files.Count == 0)
                    return BadRequest("No files received from the upload");

                if (storageConfig.AccountKey == string.Empty || storageConfig.AccountName == string.Empty)
                    return BadRequest("sorry, can't retrieve your azure storage details from appsettings.js, make sure that you add azure storage details there");

                if (storageConfig.MediaContainer == string.Empty)
                    return BadRequest("Please provide a name for your image container in the azure blob storage");

                int index = 0;
                foreach (var formFile in files)
                {
                    if (StorageHelper.IsImage(formFile) || StorageHelper.IsVideo(formFile))
                    {
                        if (formFile.Length > 0)
                        {
                            using (Stream stream = formFile.OpenReadStream())
                            {
                                string type;
                                if (StorageHelper.IsImage(formFile)) type = "Picture";
                                else type = "Video";
                                MediaTable mediaTable = new MediaTable(postId, topicId, null, DateTimeOffset.UtcNow, type, false);
                                await _context.MediaTable.AddAsync(mediaTable);
                                await _context.SaveChangesAsync();
                                isUploaded = await StorageHelper.UploadFileToStorage(stream, mediaTable.Id.ToString(), storageConfig, _context, postId, topicId, type, mediaTable);
                                ++index;
                            }
                        }
                    }
                    else
                    {   
                        return new UnsupportedMediaTypeResult();
                    }
                }

                if (isUploaded)
                {
                        return new AcceptedResult();
                }
                else
                    return BadRequest("Look like the image couldnt upload to the storage");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET /api/media/getall
        [HttpGet("getall")]
        public async Task<IActionResult> GetAll(int limit = 100)
        {
            try
            {
                if (storageConfig.AccountKey == string.Empty || storageConfig.AccountName == string.Empty)
                    return BadRequest("Sorry, can't retrieve your Azure storage details from appsettings.js, make sure that you add Azure storage details there.");

                if (storageConfig.MediaContainer == string.Empty)
                    return BadRequest("Please provide a name for your image container in Azure blob storage.");

                List<string> alllUrls = await StorageHelper.GetAllUrls(storageConfig);
                if (alllUrls.Count > limit) alllUrls = alllUrls.GetRange(0, limit);
                return new ObjectResult(alllUrls);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
