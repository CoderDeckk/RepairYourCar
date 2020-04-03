using APS.CommonModel.commonentities;
using APS.DTO.dto;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace APS.Service.interfaces
{
   public interface IAccountService
    {
        Task<SignInResult> LoginAsync(LoginModel model);
        Task<SignInResult> TwoFactorSignInAsync(VerifyCodeModel model);
        Task<ApplicationUser> GetTwoFactorAuthenticationUserAsync();
        Task<ExternalLoginInfo> GetExternalLoginInfoAsync();
        Task<string> GenerateTwoFactorTokenAsync(ApplicationUser user,string provider);
        Task<string> GeneratePasswordResetTokenAsync(ApplicationUser user);
        Task<string> GetEmailAsync(ApplicationUser user);
        Task<string> GetPhoneNumberAsync(ApplicationUser user);
        Task<ApplicationUser> GetUserAsync(ClaimsPrincipal user);
        Task<IList<string>> GetValidTwoFactorProvidersAsync(ApplicationUser user);
        Task<IdentityResult> Register(ApplicationUser model, string password);
        Task<IdentityResult> ResetPasswordAsync(ApplicationUser model,string code, string password);
        Task<SignInResult> ExternalLoginSignInAsync(string loginProvider,string providerkey, bool isPersistent);
        Task<string> GenerateEmailConfirmationTokenAsync(ApplicationUser user);
        Task SignInAsync(ApplicationUser user,bool isPersistent);
        Task SignOutAsync();
        Task<ApplicationUser> FindByIdAsync(string userId);
        Task<ApplicationUser> FindByNameAsync(string email);
        AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider,string returnUrl);
        Task<IdentityResult> ConfirmEmailAsync(ApplicationUser user, string code);
        Task<IdentityResult> CreateAsync(ApplicationUser user);
        Task<IdentityResult> AddClaimAsync(ApplicationUser user,Claim manageClaim);
        Task<IdentityResult> AddLoginAsync(ApplicationUser user,ExternalLoginInfo loginInfo);
        Task<bool> IsEmailConfirmedAsync(ApplicationUser user);
        Task<IList<string>> GetRoleAsync(ApplicationUser user);
        bool IsSignedIn(ClaimsPrincipal user);

    }
}
