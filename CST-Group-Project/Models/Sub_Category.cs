using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CST_Group_Project.Models
{
    public class Sub_Category
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Topic Table")]
        public int Parent { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string Description { get; set; }
    }
}
