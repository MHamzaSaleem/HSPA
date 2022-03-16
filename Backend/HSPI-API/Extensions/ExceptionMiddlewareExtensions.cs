using HSPI_API.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace HSPI_API.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
        //it is mandatory to add preceding this in first parameter of this method 
        public static void ConfigureBuiltInExceptionHandler(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            //this code is used to passed information about error to developers in details
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //this check is used for production environment to show unhandled exceptions
            else
            {
                app.UseExceptionHandler(
                    options => {
                        options.Run(
                            async context =>
                            {
                                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                                var ex = context.Features.Get<IExceptionHandlerFeature>();
                                if (ex != null)
                                    await context.Response.WriteAsync(ex.Error.Message);
                            }
                        );
                    });
            }
        }
    }
}
