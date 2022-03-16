using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HSPI_API.Models
{
    public class City
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "City name is mandatory Field")]
        [StringLength(50, MinimumLength =2)]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
        public DateTime LastUpdatedOn { get; set; }
        public int LastUpdatedBy { get; set; }

        //Add-Migration AddLastUpdatedFields
    }
}
