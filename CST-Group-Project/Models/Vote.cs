using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CST_Group_Project.Models
{
    public class Vote
    {
        public Vote()
        {

        }

        public Vote(int ansId, string name, DateTimeOffset? now)
        {
            AnswerId = ansId;
            PersonName = name;
            Created = now;
        }

        [Key]
        public int Id { get; set; }

        public int AnswerId { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string PersonName { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }
    }
}
