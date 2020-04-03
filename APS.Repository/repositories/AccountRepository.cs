using APS.CommonModel.commonentities;
using APS.Domain.Identity;
using APS.Repository.customentities;
using APS.Repository.interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace APS.Repository.repositories
{
    public class AccountRepository : IAccountRepository
    {
        public UserManager<ApplicationUser> UserManager { get; }

        public SignInManager<ApplicationUser> SignInManager { get; }
        public RoleManager<IdentityRole> RoleManager { get; }

        public AccountRepository(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            RoleManager = roleManager;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<SignInResult> LoginAsync(LoginEntity model)
        {
            SignInResult result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
            bool x = await RoleManager.RoleExistsAsync("Attornery");
            if (!x)
            {
                var role = new IdentityRole();
                role.Name = "Attornery";
                await RoleManager.CreateAsync(role);
            }
            return result;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<ApplicationUser> GetTwoFactorAuthenticationUserAsync()
        {
            var user = await SignInManager.GetTwoFactorAuthenticationUserAsync();
            return user;
        }
        public async Task<ExternalLoginInfo> GetExternalLoginInfoAsync()
        {
            var loginInfo = await SignInManager.GetExternalLoginInfoAsync();
            return loginInfo;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="provider"></param>
        /// <returns></returns>
        public async Task<string> GenerateTwoFactorTokenAsync(ApplicationUser user, string provider)
        {
            var code = await UserManager.GenerateTwoFactorTokenAsync(user, provider);
            return code;
        }
        public async Task<SignInResult> TwoFactorSignInAsync(VerifyCodeEntity model)
        {
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, model.RememberMe, model.RememberBrowser);
            return result;
        }
        public async Task<IdentityResult> Register(ApplicationUser model, string password)
        {
            var result = await UserManager.CreateAsync(model, password);
            return result;
        }
        public async Task<string> GenerateEmailConfirmationTokenAsync(ApplicationUser user)
        {
            string token = await UserManager.GenerateEmailConfirmationTokenAsync(user);
            return token;
        }
        public async Task<ApplicationUser> FindByIdAsync(string userId)
        {
            var user = await UserManager.FindByIdAsync(userId);
            return user;
        }
        public async Task<ApplicationUser> FindByNameAsync(string email)
        {
            var user = await UserManager.FindByNameAsync(email);
            return user;
        }
        public async Task<IdentityResult> ConfirmEmailAsync(ApplicationUser user, string code)
        {
            var result = await UserManager.ConfirmEmailAsync(user, code);
            return result;

        }
        public async Task<bool> IsEmailConfirmedAsync(ApplicationUser user)
        {
            var result = await UserManager.IsEmailConfirmedAsync(user);
            return result;
        }
        public async Task<string> GeneratePasswordResetTokenAsync(ApplicationUser user)
        {
            var result = await UserManager.GeneratePasswordResetTokenAsync(user);
            return result;
        }
        public async Task<IdentityResult> ResetPasswordAsync(ApplicationUser model, string code, string password)
        {
            var result = await UserManager.ResetPasswordAsync(model, code, password);
            return result;
        }
        public  AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider, string returnUrl)
        {
            var result = SignInManager.ConfigureExternalAuthenticationProperties(provider, returnUrl);
            return result;
        }
        public async Task<IList<string>> GetValidTwoFactorProvidersAsync(ApplicationUser user)
        {
            var result = await UserManager.GetValidTwoFactorProvidersAsync(user);
            return result;
        }
        public async Task<string> GetEmailAsync(ApplicationUser user)
        {
            var result = await UserManager.GetEmailAsync(user);
            return result;
        }
        public async Task<string> GetPhoneNumberAsync(ApplicationUser user)
        {
            var result = await UserManager.GetPhoneNumberAsync(user);
            return result;
        }
        public async Task<SignInResult> ExternalLoginSignInAsync(string loginProvider, string providerkey, bool isPersistent)
        {
            var result = await SignInManager.ExternalLoginSignInAsync(loginProvider, providerkey, isPersistent: false);
            return result;
        }
        public async Task<IdentityResult> CreateAsync(ApplicationUser user)
        {
            var result = await UserManager.CreateAsync(user);
            return result;
        }
        public async Task<IdentityResult> AddClaimAsync(ApplicationUser user, Claim manageClaim)
        {
            var result = await UserManager.AddClaimAsync(user, manageClaim);
            return result;
        }
        public async Task<IdentityResult> AddLoginAsync(ApplicationUser user, ExternalLoginInfo loginInfo)
        {
            var result = await UserManager.AddLoginAsync(user, loginInfo);
            return result;
        }
        public async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {
            await SignInManager.SignInAsync(user, isPersistent);
        }
        public async Task SignOutAsync()
        {
            await SignInManager.SignOutAsync();
        }
        public async Task<ApplicationUser> GetUserAsync(ClaimsPrincipal user)
        {
            var result = await UserManager.GetUserAsync(user);
          
            return result;
        }
        public async Task<IList<string>> GetRoleAsync(ApplicationUser user)
        {
           
            var roles= await UserManager.GetRolesAsync(user);
            if(roles==null || roles.Count==0)
            {
                await UserManager.AddToRoleAsync(user, ConstantMessages.AccountConstant.AccountRepositoryConstant.AdminRole);
            }
            roles = await UserManager.GetRolesAsync(user);
            return roles;
        }
        public bool IsSignedIn(ClaimsPrincipal user)
        {
            var result = SignInManager.IsSignedIn(user);
            return result;
        }
    }
}
