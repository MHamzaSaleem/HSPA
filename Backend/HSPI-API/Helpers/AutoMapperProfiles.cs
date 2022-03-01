using AutoMapper;
using HSPI_API.Dtos;
using HSPI_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HSPI_API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDTO>().ReverseMap();
        }
    }
}
