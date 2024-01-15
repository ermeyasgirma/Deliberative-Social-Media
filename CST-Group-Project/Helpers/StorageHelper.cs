using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using CST_Group_Project.Data;
using CST_Group_Project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
namespace CST_Group_Project.Helpers
{
    public class StorageHelper
    {
        public static bool IsImage(IFormFile file)
        {
            if (file.ContentType.Contains("image"))
            {
                return true;
            }

            string[] formats = new string[] { ".jpg", ".png", ".gif", ".jpeg" };

            return formats.Any(item => file.FileName.EndsWith(item, StringComparison.OrdinalIgnoreCase));
        }

        public static bool IsVideo(IFormFile file)
        {
            if (file.ContentType.Contains("video"))
            {
                return true;
            }

            string[] formats = new string[] { ".mp4", ".mov", ".flv" };

            return formats.Any(item => file.FileName.EndsWith(item, StringComparison.OrdinalIgnoreCase));
        }

        public static async Task<bool> UploadFileToStorage(Stream fileStream, string fileName,
                                                            AzureStorageConfig _storageConfig, MyDatabaseContext _context, int? postId, int? topicId, string type,
                                                            MediaTable mediaTable)
        {
            // Create a URI to the blob
            Uri blobUri = new Uri("https://" +
                                  _storageConfig.AccountName +
                                  ".blob.core.windows.net/" +
                                  _storageConfig.MediaContainer +
                                  "/" + fileName);
            

            // Create StorageSharedKeyCredentials object by reading
            // the values from the configuration (appsettings.json)
            StorageSharedKeyCredential storageCredentials =
                new StorageSharedKeyCredential(_storageConfig.AccountName, _storageConfig.AccountKey);

            // Create the blob client.
            BlobClient blobClient = new BlobClient(blobUri, storageCredentials);
            await blobClient.UploadAsync(fileStream);
            bool flag = false;
            JObject ans = await MediaTableHelper.Get(blobUri.ToString(), type);
            if (type == "Picture")
            {   
                JObject offensive = (JObject)ans["offensive"];
                string offvalue = (string)offensive.SelectToken("prob");
                JObject nudity = (JObject)ans["nudity"];
                string nudvalue = (string)nudity.SelectToken("raw");
                if (offvalue.ElementAt(2) >= '5' || nudvalue.ElementAt(2) >= '5') flag = true;
            }
            else
            {
                JArray frames = (JArray)ans["data"]["frames"];
                foreach (var frame in frames)
                {
                    JToken x = frame["nudity"], y = frame["offensive"];
                    string nudvalue = (string)x["raw"], offvalue = (string)y["prob"];
                    if (offvalue.ElementAt(2) >= '5' || nudvalue.ElementAt(2) >= '5')
                    {
                        flag = true;
                        break;
                    }
                }
            }
            mediaTable.Flag = flag;
            mediaTable.Body = blobUri.ToString();
            _context.Entry(mediaTable).State = EntityState.Modified;
            //await _context.MediaTable
       
            // Upload the file
            await _context.SaveChangesAsync();

            return await Task.FromResult(true);
        }

        public static async Task<bool> RemoveFileFromStorage(string blobToDelete, AzureStorageConfig _storageConfig)
        {
            
            // Create a URI to the storage account
            Uri accountUri = new Uri("https://" + _storageConfig.AccountName + ".blob.core.windows.net/");

            StorageSharedKeyCredential storageCredentials =
                new StorageSharedKeyCredential(_storageConfig.AccountName, _storageConfig.AccountKey);

            // Create BlobServiceClient from the account URI
            BlobServiceClient blobServiceClient = new BlobServiceClient(accountUri, storageCredentials);

            BlobContainerClient container = blobServiceClient.GetBlobContainerClient(_storageConfig.MediaContainer);

            var blob = container.GetBlobClient(blobToDelete);
            blob.DeleteIfExists();
            return await Task.FromResult(true);
        }

        public static async Task<List<string>> GetAllUrls(AzureStorageConfig _storageConfig)
        {
            List<string> allUrls = new List<string>();

            // Create a URI to the storage account
            Uri accountUri = new Uri("https://" + _storageConfig.AccountName + ".blob.core.windows.net/");

            // Create BlobServiceClient from the account URI
            BlobServiceClient blobServiceClient = new BlobServiceClient(accountUri);

            // Get reference to the container
            BlobContainerClient container = blobServiceClient.GetBlobContainerClient(_storageConfig.MediaContainer);

            if (container.Exists())
            {
                foreach (BlobItem blobItem in container.GetBlobs())
                {
                    allUrls.Add(container.Uri + "/" + blobItem.Name);
                }
            }
            return await Task.FromResult(allUrls);
        }


    }
}
