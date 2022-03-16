using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HSPI_API.Controllers
{
    //ApiController attribute is introduce in .net core version 2.1
    //and it is responsible for validating api coming request data validation
    //if we comment out this ApiController than we have to apply validation manually by using ModelState
    //example given in post api method AddCity
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
