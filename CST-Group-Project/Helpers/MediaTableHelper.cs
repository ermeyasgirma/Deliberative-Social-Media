using CST_Group_Project.Data;
using CST_Group_Project.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;


namespace CST_Group_Project.Helpers
{
    public class MediaTableHelper
    {
        public static async Task<JObject> Get(string body, string type)
        {
            var result = await GetExternalResponse(body, type);
            JObject ans = JObject.Parse(result);
            return ans;
        }

        private static async Task<string> GetExternalResponse(string body, string type)
        {
            var client = new HttpClient();
            string _address;
            if (type == "Picture") _address = "https://api.sightengine.com/1.0/check.json?models=offensive,nudity&api_user=1467034119&api_secret=owrcYpNH6tG6ToJFM3wi&url=";
            else _address = "https://api.sightengine.com/1.0/video/check-sync.json?models=offensive,nudity&api_user=1467034119&api_secret=owrcYpNH6tG6ToJFM3wi&stream_url=";
            _address += body;
            HttpResponseMessage response = await client.GetAsync(_address);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadAsStringAsync();
            return result;
        }
    }
}
