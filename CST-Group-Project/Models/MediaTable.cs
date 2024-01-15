using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CST_Group_Project.Models
{
    public class MediaTable
    {

        public MediaTable() { }
        public MediaTable(int? postId, int? topicId, string body, DateTimeOffset? now, string type, bool flag)
        {
            TopicId = topicId;
            PostId = postId;
            Body = body;
            Created = now;
            Type = type;
            Flag = flag;
        }

        

        [Key]
        public int Id { get; set; }

        [ForeignKey("Post Table")]
        public int? PostId { get; set; }

        [ForeignKey("Topic Table")]
        public int? TopicId { get; set; }

        [Column(TypeName = "nvarchar(256)")]
        public string Body { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }

        [Column(TypeName = "bit")]
        public bool? Flag { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string Type { get; set; }
    }
}
