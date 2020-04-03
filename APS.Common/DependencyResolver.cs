using APS.Domain.DBModels;
using APS.Domain.Identity;
using APS.Repository;
using APS.Repository.interfaces;
using APS.Repository.repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace APS.Common
{
    public class DependencyResolver
    {
        public void DependencyResolverForDomain(IServiceCollection services,IConfiguration configuration)
        {
            services.AddDbContext<APSContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),b=>b.MigrationsAssembly("APS.Domain")));
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("APS.Domain")));
            //services.AddDefaultIdentity<ApplicationUser>();
            //.AddDefaultUI(UIFramework.Bootstrap4);
            services.AddIdentity<APS.CommonModel.commonentities.ApplicationUser, IdentityRole>()
                
               // .AddDefaultUI(UIFramework.Bootstrap4)
               .AddEntityFrameworkStores<ApplicationDbContext>()
               .AddDefaultTokenProviders();
            services.AddScoped<RoleManager<IdentityRole>>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IMasterRepository, MasterRepository>();
            services.AddScoped<IGenericRepository<LookupType>, GenericRepository<LookupType>> ();
            services.AddScoped<IGenericRepository<LookupValues>, GenericRepository<LookupValues>> ();

        }


    }
}
