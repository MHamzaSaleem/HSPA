using HSPI_API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HSPI_API.Data
{
    public class DataContext: DbContext
    {
        //this dbcontext option carry the information of database provider that will be injected by are application 
        //configuration that provides in STARTUP.CS File   
        public DataContext(DbContextOptions<DataContext> options) : base(options){ }
        public DbSet<City> Cities { get; set; }
        public DbSet<User> Users { get; set; }
    }
} 
