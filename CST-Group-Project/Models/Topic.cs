using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CST_Group_Project.Models
{
    public class Topic
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Person Table")]
        [Column(TypeName = "nvarchar(20)")]
        public string? Creator { get; set; }

        [Column(TypeName = "nvarchar(256)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string? Body { get; set; }

        /// Available types should be:TEXT, PICTURE, VIDEO, POLL
        [Column(TypeName = "nvarchar(20)")]
        public string? Type { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string? Description { get; set; }

        [Column(TypeName = "bit")]
        public bool? OpenFlag { get; set; }

    }
}
