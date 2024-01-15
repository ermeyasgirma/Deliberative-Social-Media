using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace CST_Group_Project.Models
{
    public class LinkUserTopic
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Person Table")]
        public string PersonName { get; set; }

        [ForeignKey("Topic Table")]
        public int TopicId { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }
    }
}
