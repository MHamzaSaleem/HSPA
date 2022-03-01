using HSPI_API.Data;
using HSPI_API.Data.Repo;
using HSPI_API.Helpers;
using HSPI_API.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HSPI_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Default")));
            services.AddControllers();
            //agr hm kisi aur domain se req kr ty hain kisi aur domain pr ajax k through tu .net web m black
            //krdeta h CORS policy k through k malicious activity se bachny k liye
            //usky liye hamien ye AddCors ki middleware add krna prti hai
            services.AddCors();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            //we have to provide the assemblies name which automapper should scan
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()); 

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
