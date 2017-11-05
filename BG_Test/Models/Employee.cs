using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BG_Test.Models
{
    public class Employee
    {
        public int id { get; set; }

        [Required]
        public string forename { get; set; }
        
        public string surname { get; set; }

        [Required]
        public string emailAddress { get; set; }
    }
}
