using CST_Group_Project.Data;
using CST_Group_Project.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;


namespace CST_Group_Project.Helpers
{
    public class PostHelper
    {
        public static async Task<Boolean> PutPost(Post post, MyDatabaseContext _context)
        {
            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }

            return true;
        }

        public static async Task<string> Get(string body)
        {
            var result = await GetExternalResponse(body);

            return result;
        }

        private static async Task<string> GetExternalResponse(string body)
        {
            var client = new HttpClient();
            string _address = "https://www.purgomalum.com/service/containsprofanity?text=" + body;
            HttpResponseMessage response = await client.GetAsync(_address);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadAsStringAsync();
            return result;
        }
    }
}
