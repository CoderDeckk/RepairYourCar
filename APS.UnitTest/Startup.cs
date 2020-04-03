using APS.Domain.DBModels;
using APS.Service.interfaces;
using APS.Service.services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace APS.UnitTest
{
    class Startup
    {

        public IConfigurationRoot ConfigurationRoot { get; set; }

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;

            var builder = new ConfigurationBuilder();
               // .AddJsonFile("~/config/appsettings.json", optional: true, reloadOnChange: true);

            //builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //Add Connection string
            //use below if want to test with TEST data
            //string connString = "Server=localhost\\SQLEXPRESS2017;Database=APS;Trusted_Connection=True;MultipleActiveResultSets=true;user id =sa;password=Pa55w0rd;"
            //services.AddDbContext<APSContext>(options => options.UseSqlServer(connString));

            //use below if want to test with in memory data
            services.AddDbContext<APSContext>(soptions =>
                soptions.UseInMemoryDatabase(databaseName: "APSContext"));

            //DI
            services.AddScoped<IMasterService, MasterService>();

            Initializer.RegisterMockRepositories(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CorsPolicy");
            //app.UseHttpsRedirection();
            DbContextExtensions.Seed(app.ApplicationServices.GetService<APSContext>()); //Initial data prepar           
            app.UseMvc();
        }
    }
}
