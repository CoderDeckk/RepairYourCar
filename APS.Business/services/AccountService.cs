using APS.CommonModel.commonentities;
using APS.DTO.dto;
using APS.Repository.customentities;
using APS.Repository.interfaces;
using APS.Service.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace APS.Service.services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;
        public AccountService(IAccountRepository accountRepositoy, IMapper mapper)
        {
            this._accountRepository = accountRepositoy;
            this._mapper = mapper;
        }
        public async Task<SignInResult> LoginAsync(LoginModel model)
        {
            LoginEntity loginEntity = _mapper.Map<LoginModel, LoginEntity>(model);
            // LoginEntity loginEntity = GetLoggedInModel(model);
            var signInResult = await _accountRepository.LoginAsync(loginEntity);
            return signInResult;
        }
        public async Task<ApplicationUser> GetTwoFactorAuthenticationUserAsync()
        {
            var user = await _accountRepository.GetTwoFactorAuthenticationUserAsync();
            var dtoEntity = _mapper.Map<ApplicationUser>(user);
            return dtoEntity;
        }
        public async Task<ExternalLoginInfo> GetExternalLoginInfoAsync()
        {
            var loginInfo = await _accountRepository.GetExternalLoginInfoAsync();
            return loginInfo;
        }
        public async Task<string> GenerateTwoFactorTokenAsync(ApplicationUser user, string provider)
        {
            var code = await _accountRepository.GenerateTwoFactorTokenAsync(user, provider);
            return code;
        }
        public async Task<SignInResult> TwoFactorSignInAsync(VerifyCodeModel model)
        {
            VerifyCodeEntity domainEntity = _mapper.Map<VerifyCodeEntity>(model);
            var result = await _accountRepository.TwoFactorSignInAsync(domainEntity);
            return result;
        }
        public async Task<IdentityResult> Register(ApplicationUser model, string password)
        {
            var result = await _accountRepository.Register(model, password);
            return result;
        }
        public async Task<string> GenerateEmailConfirmationTokenAsync(ApplicationUser user)
        {
            var token = await _accountRepository.GenerateEmailConfirmationTokenAsync(user);
            return token;
        }
        public async Task<ApplicationUser> FindByIdAsync(string userId)
        {
            var user = await _accountRepository.FindByIdAsync(userId);
            return user;
        }
        public async Task<ApplicationUser> FindByNameAsync(string email)
        {
            var user = await _accountRepository.FindByNameAsync(email);
            return user;
        }
        public async Task<IdentityResult> ConfirmEmailAsync(ApplicationUser user, string code)
        {
            var result = await _accountRepository.ConfirmEmailAsync(user, code);
            return result;
        }
        public async Task<bool> IsEmailConfirmedAsync(ApplicationUser user)
        {
            var result = await _accountRepository.IsEmailConfirmedAsync(user);
            return result;
        }
        public bool IsSignedIn(ClaimsPrincipal user)
        {
            var result = _accountRepository.IsSignedIn(user);
            return result;
        }
        public async Task<string> GeneratePasswordResetTokenAsync(ApplicationUser user)
        {
            var result = await _accountRepository.GeneratePasswordResetTokenAsync(user);
            return result;
        }
        public async Task<IdentityResult> ResetPasswordAsync(ApplicationUser model, string code, string password)
        {
            var result = await _accountRepository.ResetPasswordAsync(model, code, password);
            return result;
        }
        public async Task<SignInResult> ExternalLoginSignInAsync(string loginProvider, string providerkey, bool isPersistent)
        {
            var result = await _accountRepository.ExternalLoginSignInAsync(loginProvider, providerkey, isPersistent);
            return result;
        }
        public AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider, string returnUrl)
        {
            var result = _accountRepository.ConfigureExternalAuthenticationProperties(provider, returnUrl);
            return result;
        }
        public async Task<IList<string>> GetValidTwoFactorProvidersAsync(ApplicationUser user)
        {
            var result = await _accountRepository.GetValidTwoFactorProvidersAsync(user);
            return result;
        }
        public async Task<string> GetEmailAsync(ApplicationUser user)
        {
            var result = await _accountRepository.GetEmailAsync(user);
            return result;
        }
        public async Task<string> GetPhoneNumberAsync(ApplicationUser user)
        {
            var result = await _accountRepository.GetPhoneNumberAsync(user);
            return result;
        }
        public async Task<IdentityResult> CreateAsync(ApplicationUser user)
        {
            var result = await _accountRepository.CreateAsync(user);
            return result;
        }
        public async Task<IdentityResult> AddClaimAsync(ApplicationUser user, Claim manageClaim)
        {
            var result = await _accountRepository.AddClaimAsync(user, manageClaim);
            return result;
        }
        public async Task<IdentityResult> AddLoginAsync(ApplicationUser user, ExternalLoginInfo loginInfo)
        {
            var result = await _accountRepository.AddLoginAsync(user, loginInfo);
            return result;
        }
        public async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {
            await _accountRepository.SignInAsync(user, isPersistent);
        }
        public async Task SignOutAsync()
        {
            await _accountRepository.SignOutAsync();
        }
        public async Task<ApplicationUser> GetUserAsync(ClaimsPrincipal user)
        {
            var result = await _accountRepository.GetUserAsync(user);
            return result;
        }
        public async Task<IList<string>> GetRoleAsync(ApplicationUser user)
        {
            var roles = await _accountRepository.GetRoleAsync(user);
            return roles;
        }
    }
}
