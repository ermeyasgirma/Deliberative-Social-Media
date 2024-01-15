using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CST_Group_Project.Models;
using JWTAuthentication.Authentication;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace CST_Group_Project.Data
{
    public class MyDatabaseContext : IdentityDbContext<ApplicationUser>
    {
        public MyDatabaseContext (DbContextOptions<MyDatabaseContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<CST_Group_Project.Models.Person> Person { get; set; }
        public DbSet<CST_Group_Project.Models.Comment> Comment { get; set; }
        public DbSet<CST_Group_Project.Models.Post> Post { get; set; }
        public DbSet<CST_Group_Project.Models.Link> Link { get; set; }
        public DbSet<CST_Group_Project.Models.Topic> Topic { get; set; }
        public DbSet<CST_Group_Project.Models.Sub_Category> Sub_Category { get; set; }
        public DbSet<CST_Group_Project.Models.MediaTable> MediaTable { get; set; }
        public DbSet<CST_Group_Project.Models.Reaction> Reaction { get; set; }
        public DbSet<CST_Group_Project.Models.Poll> Poll { get; set; }
        public DbSet<CST_Group_Project.Models.Answer> Answer { get; set; }
        public DbSet<CST_Group_Project.Models.Vote> Vote { get; set; }
        public DbSet<CST_Group_Project.Models.LinkUserTopic> LinkUserTopic { get; set; }
    }
}
