using HSPI_API.Data;
using HSPI_API.Data.Repo;
using HSPI_API.Extensions;
using HSPI_API.Helpers;
using HSPI_API.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
            services.AddControllers().AddNewtonsoftJson();
            //agr hm kisi aur domain se req kr ty hain kisi aur domain pr ajax k through tu .net web m block
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
            #region Exception Code Move to ExceptionMiddleWareExtensionClass
            ////this code is used to passed information about error to developers in details
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //}
            ////this check is used for production environment to show unhandled exceptions
            //else {
            //    app.UseExceptionHandler(
            //        options => {
            //            options.Run(
            //                async context =>
            //                {
            //                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            //                    var ex = context.Features.Get<IExceptionHandlerFeature>();
            //                    if (ex != null)
            //                        await context.Response.WriteAsync(ex.Error.Message);
            //                }
            //            );
            //    });
            //}
            #endregion

            app.ConfigureExceptionHandler(env);

            //app.ConfigureBuiltInExceptionHandler(env);

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
