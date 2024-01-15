using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CST_Group_Project.Models
{
    public class Reaction
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Post Table")]
        public int PostId { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        [ForeignKey("Person Table")]
        public string PersonName { get; set; }

        /// <summary>
        /// Possible Reacted are: Like, Dislike, CMM (Changed my mind)
        /// </summary>
        [Column(TypeName = "nvarchar(20)")]
        public string Reacted { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }

        public static implicit operator List<object>(Reaction v)
        {
            throw new NotImplementedException();
        }
    }
}
