using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HSPI_API.Dtos
{
    public class CityDTO
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "City name is mandatory Field")]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Numeric are not allowed.")]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
    }
}
