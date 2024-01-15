using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace CST_Group_Project.Models
{
    public class Link
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Post Table")]
        public int PostId { get; set; }

        [ForeignKey("Post Table")]
        public int Linked { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }
    }
}
