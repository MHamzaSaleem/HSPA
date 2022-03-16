using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using HSPI_API.Models;
using HSPI_API.Data.Repo;
using HSPI_API.Interfaces;
using HSPI_API.Dtos;
using System.Linq;
using AutoMapper;
using System.Collections.Generic;

namespace HSPI_API.Controllers
{
    //ApiController attribute is introduce in .net core version 2.1
    //and it is responsible for validating api coming request data validation
    //if we comment out this ApiController than we have to apply validation manually by using ModelState
    //example given in post api method AddCity
    //[Route("api/[controller]")]
    //[ApiController]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork repo;
        private readonly IMapper mapper;


        public CityController(IUnitOfWork repo, IMapper mapper)
        {
            this.mapper = mapper;
            this.repo = repo;
        }
        //If we use IActionResult then we can return various standard status of Http PK(200), NotFound(404), BadRequest(400)
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            throw new System.UnauthorizedAccessException();
            //var cities = await dc.Cities.ToListAsync();
            var cities = await repo.CityRepository.GetCitiesAsync();
            var citiesDTO = mapper.Map<IEnumerable<CityDTO>>(cities);
            return Ok(citiesDTO);

            #region Manaully DTO Mapping
            //var citiesDTO = from x in cities
            //                select new CityDTO()
            //                {
            //                    Id = x.Id,
            //                    Name = x.Name
            //                };
            //return Ok(citiesDTO); 
            #endregion
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "Atlanta";
        }

        //Post api/City/add?cityName=Karachi
        //post api/city/add/Karachi
        //[HttpPost("add")]
        //[HttpPost("add/{cityName}")]
        //public async Task<IActionResult> AddCity(string cityName)
        //{
        //    City city = new City();
        //    city.Name = cityName;
        //    await dc.Cities.AddAsync(city);
        //    await dc.SaveChangesAsync();
        //    return Ok(city);
        //}

        //Post data in json format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDTO citydto)
        {
            #region Old Way To Validate Request
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);
            #endregion

            #region Manaully DTO Mapping
            //var city = new City()
            //{
            //    Id = citydto.Id,
            //    Name = citydto.Name,
            //    LastUpdatedBy = 1,
            //    LastUpdatedOn = System.DateTime.Now
            //};
            #endregion

            var city = mapper.Map<City>(citydto);
            repo.CityRepository.AddCity(city);
            await repo.SaveAsync();
            return StatusCode(201);
            //return Ok(city);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            repo.CityRepository.DeleteCity(id);
            await repo.SaveAsync();
            return Ok(id);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(CityDTO citydto, int id)
        {
            if (id != citydto.Id)
                return BadRequest("Update not allowed!");
            var cityFromDB = await repo.CityRepository.FindCity(id);
            if (cityFromDB == null)
                return BadRequest("Update not allowed!");
            cityFromDB.LastUpdatedBy = 1;
            cityFromDB.LastUpdatedOn = System.DateTime.Now;
            mapper.Map(citydto, cityFromDB);
            await repo.SaveAsync();
            return StatusCode(200);
        }
        //[HttpPatch("update/{id}")]
        //public async Task<IActionResult> UpdateCityPatch(JsonPatchExtensions<City> citydto, int id)
        //{
        //    var cityFromDB = await repo.CityRepository.FindCity(id);
        //    cityFromDB.LastUpdatedBy = 1;
        //    cityFromDB.LastUpdatedOn = System.DateTime.Now;
        //    mapper.Map(citydto, cityFromDB);
        //    await repo.SaveAsync();
        //    return StatusCode(200);
        //}
    }
}
