using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace CST_Group_Project.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Post Table")]
        public int PostId { get; set; }

        [ForeignKey("Person Table")]
        [Column(TypeName = "nvarchar(20)")]
        public string Creator { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Body { get; set; }

        [ForeignKey("Comment Table")]
        public int? ParentCommentId { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }

        [Column(TypeName = "bit")]
        public bool? Flag { get; set; }
    }
}
