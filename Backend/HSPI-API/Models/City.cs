using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HSPI_API.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime LastUpdatedOn { get; set; }
        public int LastUpdatedBy { get; set; }

        //Add-Migration AddLastUpdatedFields
    }
}
