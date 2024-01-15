using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CST_Group_Project.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Subcategory Table")]
        public int Subcategory { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Body { get; set; }

        /// <summary>
        /// Available types should be:TEXT, PICTURE, VIDEO, POLL
        /// </summary>
        [Column(TypeName = "nvarchar(20)")]
        public string Type { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string? Creator { get; set; }

        [Column(TypeName = "bit")]
        public bool? CommentsEnabled { get; set; }

        [Column(TypeName = "int")]
        public int? Likes { get; set; }

        [Column(TypeName = "int")]
        public int? Dislikes { get; set; }

        [Column(TypeName = "int")]
        public int? CMM { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string? Caption { get; set; }

        [Column(TypeName = "bit")]
        public bool? Flag { get; set; }

        [Column(TypeName = "bit")]
        public bool? HasMedia { get; set; }
    }
}
