using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CST_Group_Project.Models
{
    public class Person
    {
        //Don't add [Key]
        [Key]
        [Column(TypeName = "nvarchar(20)")]
        public string Name { get; set; }

        /// <summary>
        /// can be either User/Admin
        /// </summary>
        public string? Permission { get; set; }

        [Column(TypeName = "datetimeoffset(7)")]
        public DateTimeOffset? Created { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string? Email { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string? Token { get; set; }

        public DateTime? TokenExpiration { get; set; }

        public bool? EmailConfirmed { get; set; }

        [Column(TypeName = "nvarchar(25)")]
        public string Gender { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string FirstName { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string LastName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Country { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string County {get;set;}
        
        public int? Age { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string EthnicBackground { get; set; }
    }
}
