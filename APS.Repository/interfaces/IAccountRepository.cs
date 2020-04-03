using APS.CommonModel.commonentities;
using APS.Domain.Identity;
using APS.Repository.customentities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace APS.Repository.interfaces
{
    public interface IAccountRepository
    {
        Task<SignInResult> LoginAsync(LoginEntity model);
        Task<ApplicationUser> GetTwoFactorAuthenticationUserAsync();
        Task<ExternalLoginInfo> GetExternalLoginInfoAsync();
        Task<string> GenerateTwoFactorTokenAsync(ApplicationUser user, string provider);
        Task<string> GeneratePasswordResetTokenAsync(ApplicationUser user);
        Task<IdentityResult> ResetPasswordAsync(ApplicationUser model, string code, string password);
        AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider, string returnUrl);
        Task<string> GetEmailAsync(ApplicationUser user);
        Task<string> GetPhoneNumberAsync(ApplicationUser user);
        Task<IList<string>> GetValidTwoFactorProvidersAsync(ApplicationUser user);
        Task<SignInResult> TwoFactorSignInAsync(VerifyCodeEntity model);
        Task<IdentityResult> Register(ApplicationUser model, string password);
        Task<string> GenerateEmailConfirmationTokenAsync(ApplicationUser user);
        Task<ApplicationUser> FindByIdAsync(string userId);
        Task<ApplicationUser> FindByNameAsync(string email);
        Task<IdentityResult> ConfirmEmailAsync(ApplicationUser user, string code);
        Task<bool> IsEmailConfirmedAsync(ApplicationUser user);
        Task<SignInResult> ExternalLoginSignInAsync(string loginProvider, string providerkey, bool isPersistent);
        Task<IdentityResult> CreateAsync(ApplicationUser user);
        Task<IdentityResult> AddClaimAsync(ApplicationUser user, Claim manageClaim);
        Task<IdentityResult> AddLoginAsync(ApplicationUser user, ExternalLoginInfo manageClaim);
        Task SignInAsync(ApplicationUser user, bool isPersistent);
        Task SignOutAsync();
        Task<ApplicationUser> GetUserAsync(ClaimsPrincipal user);
        Task<IList<string>> GetRoleAsync(ApplicationUser user);
       bool IsSignedIn(ClaimsPrincipal user);
    }
}
