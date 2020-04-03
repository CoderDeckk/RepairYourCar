using APS.CommonModel.commonentities;
using APS.Service.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Threading.Tasks;
using static APS.CommonModel.commonentities.ConstantMessages;

namespace APS.Web.Models
{
    public class AuthorizationFilterAttribute : Attribute,IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            IAccountService _accountService = context.HttpContext.RequestServices.GetService<IAccountService>(); 
            var currentUser= context.HttpContext.User;
            ApplicationUser user= _accountService.GetUserAsync(currentUser).Result;
            if (user != null)
            {
                IList<string> userRoles = _accountService.GetRoleAsync(user).Result;
                if (!userRoles.Contains(AccountConstant.AccountRepositoryConstant.AdminRole))
                {

                    context.Result = new RedirectToRouteResult(
                             new RouteValueDictionary {
                           {
                            "Controller",
                            "Account"
                           }, {
                            "Action",
                            "Login"
                           }
                             });
                }
            }
            else
            {
                //context.Result = new RedirectToRouteResult(
                //           new RouteValueDictionary {
                //           {
                //            "Controller",
                //            "Account"
                //           }, {
                //            "Action",
                //            "Login"
                //           }
                //           });
            }
        }
    }
}
