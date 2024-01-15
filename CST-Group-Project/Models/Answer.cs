using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CST_Group_Project.Models
{
    public class Answer
    {

        public Answer()
        {

        }

        public Answer(int pollId, string answerText, int? votes, DateTimeOffset? now)
        {
            PollId = pollId;
            AnswerText = answerText;
            Votes = votes;
            Created = now;
        }

        [Key]
        public int Id { get; set; }

        [ForeignKey("Poll Table")]
        public int PollId { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string AnswerText { get; set; }

        [Column(TypeName = "int")]
        public int? Votes { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }
    }
}
