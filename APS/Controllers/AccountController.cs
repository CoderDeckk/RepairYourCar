using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using APS.CommonModel.commonentities;
using APS.DTO.dto;
using APS.Service.interfaces;
using APS.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;

namespace APS.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IAccountService _accountService;
        private readonly IEmailService _emailService;
        private readonly HtmlEncoder _htmlEncoder;
        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<AccountController> logger,
            IAccountService accountService,
            IEmailService emailService,HtmlEncoder htmlEncoder)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            _logger = logger;
            _accountService = accountService;
            _emailService = emailService;
            _htmlEncoder = htmlEncoder;
        }

        public UserManager<ApplicationUser> UserManager { get; }

        public SignInManager<ApplicationUser> SignInManager { get; }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public IActionResult Login(string returnUrl = null)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel model, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            try
            {

                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, change to lockoutOnFailure: true

                var result = await _accountService.LoginAsync(model);
                if (result.Succeeded)
                {
                    _logger.LogInformation(ConstantMessages.AccountConstant.AccountControllerConstant.LoggedInUserLog, model.Email);
                    return RedirectToLocal(returnUrl);
                }
                if (result.RequiresTwoFactor)
                {
                    return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.SendCode,
                                new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                }
                if (result.IsLockedOut)
                {
                    return View(ConstantMessages.AccountConstant.AccountControllerConstant.Lockout);
                }
                else
                {
                    _logger.LogWarning(ConstantMessages.AccountConstant.AccountControllerConstant.FailedToLoginMessage, model.Email);
                    ModelState.AddModelError("", ConstantMessages.AccountConstant.AccountControllerConstant.InvalidAttempt);
                    return View(model);
                }
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, bool rememberMe, string returnUrl = null)
        {
            try
            {
                var user = await _accountService.GetTwoFactorAuthenticationUserAsync();
                if (user == null)
                {
                    return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView);
                }

                // Remove before production
#if DEMO
            if (user != null)
            {
                ViewBag.Code = await _accountService.GenerateTwoFactorTokenAsync(user, _htmlEncoder.Encode(provider));
            }
#endif
                return View(new VerifyCodeModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            try
            {
                // The following code protects for brute force attacks against the two factor codes.
                // If a user enters incorrect codes for a specified amount of time then the user account
                // will be locked out for a specified amount of time.
                // You can configure the account lockout settings in IdentityConfig
                var result = await _accountService.TwoFactorSignInAsync(model);
                if (result.Succeeded)
                {
                    return RedirectToLocal(model.ReturnUrl);
                }
                if (result.IsLockedOut)
                {
                    return View(ConstantMessages.AccountConstant.AccountControllerConstant.Lockout);
                }
                else
                {
                    ModelState.AddModelError("", ConstantMessages.AccountConstant.AccountControllerConstant.InvalidCode);
                    return View(model);
                }
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public IActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                    var result = await _accountService.Register(user, _htmlEncoder.Encode(model.Password));
                    if (result.Succeeded)
                    {
                        _logger.LogInformation(ConstantMessages.AccountConstant.AccountControllerConstant.UserCreated, model.Email);
                        //Bug: Remember browser option missing?
                        //Uncomment this and comment the later part if account verification is not needed.

                        // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                        // Send an email with this link
                        string code = await _accountService.GenerateEmailConfirmationTokenAsync(user);
                        var callbackUrl = Url.Action(ConstantMessages.AccountConstant.AccountControllerConstant.ConfirmEmail,
                            ConstantMessages.AccountConstant.AccountControllerConstant.Account,
                                new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
                        await _emailService.SendEmail(_htmlEncoder.Encode(model.Email),
                            ConstantMessages.AccountConstant.AccountControllerConstant.ConfirmAccount,
                            ConstantMessages.AccountConstant.AccountControllerConstant.ConfirmAccountMessage + callbackUrl + "\">link</a>");
#if !DEMO
                        return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.HomeIndexView,
                            ConstantMessages.AccountConstant.AccountControllerConstant.HomeController);
#else
                    //To display the email link in a friendly page instead of sending email
                    ViewBag.Link = callbackUrl;
                    return View("DemoLinkDisplay");
#endif

                    }
                    AddErrors(result);
                }
                // If we got this far, something failed, redisplay form
                return View(model);
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            try
            {
                if (userId == null || code == null)
                {
                    return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView);
                }

                var user = await _accountService.FindByIdAsync(_htmlEncoder.Encode(userId));
                if (user == null)
                {
                    return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView);
                }
                var result = await _accountService.ConfirmEmailAsync(user, _htmlEncoder.Encode(code));
                return View(result.Succeeded ? ConstantMessages.AccountConstant.AccountControllerConstant.ConfirmEmail
                    : ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView);
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _accountService.FindByNameAsync(_htmlEncoder.Encode(model.Email));
                    var isEmailConfirmed = _accountService.IsEmailConfirmedAsync(user);
                    if (user == null || !(isEmailConfirmed.Result))
                    {
                        // Don't reveal that the user does not exist or is not confirmed
                        return View(ConstantMessages.AccountConstant.AccountControllerConstant.ForgotPasswordConfirmation);
                    }

                    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    string code = await _accountService.GeneratePasswordResetTokenAsync(user);
                    var callbackUrl = Url.Action(ConstantMessages.AccountConstant.AccountControllerConstant.ResetPassword,
                       ConstantMessages.AccountConstant.AccountControllerConstant.AccountController, new { code = code }, protocol: HttpContext.Request.Scheme);
                    await _emailService.SendEmail(_htmlEncoder.Encode(model.Email),
                        ConstantMessages.AccountConstant.AccountControllerConstant.ResetPasswordMessage,
                        ConstantMessages.AccountConstant.AccountControllerConstant.ResetPasswordLinkMessage + callbackUrl + "\">link</a>");
#if !DEMO
                    return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.ForgotPasswordConfirmation);
#else
                //To display the email link in a friendly page instead of sending email
                ViewBag.Link = callbackUrl;
                return View("DemoLinkDisplay");
#endif
                }

                ModelState.AddModelError("", string.Format(ConstantMessages.AccountConstant.AccountControllerConstant.AccountNotFoundMessage, model.Email));

                // If we got this far, something failed, redisplay form
                return View(model);
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }

            }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            try
            {
                var resetPasswordViewModel = new ResetPasswordModel() { Code = _htmlEncoder.Encode(code ?? string.Empty) };
                return string.IsNullOrWhiteSpace(code) ? View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView)
                    : View(resetPasswordViewModel);
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return View(model);
                }
                var user = await _accountService.FindByNameAsync(_htmlEncoder.Encode(model.Email));
                if (user == null)
                {
                    // Don't reveal that the user does not exist
                    return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.ResetPasswordConfirmation,
                       ConstantMessages.AccountConstant.AccountControllerConstant.Account);
                }
                var result = await _accountService.ResetPasswordAsync(user, _htmlEncoder.Encode(model.Code), _htmlEncoder.Encode(model.Password));
                if (result.Succeeded)
                {
                    return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.ResetPasswordConfirmation,
                        ConstantMessages.AccountConstant.AccountControllerConstant.Account);
                }
                AddErrors(result);
                return View();
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            try
            {
                // Request a redirect to the external login provider
                var redirectUrl = Url.Action(ConstantMessages.AccountConstant.AccountControllerConstant.ExternalLoginCallback,
                     ConstantMessages.AccountConstant.AccountControllerConstant.Account, new { ReturnUrl = returnUrl });
                var properties = _accountService.ConfigureExternalAuthenticationProperties(_htmlEncoder.Encode(provider), _htmlEncoder.Encode(redirectUrl));
                return new ChallengeResult(provider, properties);
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(bool rememberMe, string returnUrl = null)
        {
            try
            {
                var user = await _accountService.GetTwoFactorAuthenticationUserAsync();
                if (user == null)
                {
                    return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView);
                }
                var userFactors = await _accountService.GetValidTwoFactorProvidersAsync(user);
                var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
                return View(new SendCodeModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return View();
                }

                var user = await _accountService.GetTwoFactorAuthenticationUserAsync();
                if (user == null)
                {
                    return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView);
                }

                // Generate the token and send it

                var code = await _accountService.GenerateTwoFactorTokenAsync(user, _htmlEncoder.Encode(model.SelectedProvider));
                if (string.IsNullOrWhiteSpace(code))
                {
                    return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView);
                }

                var message = ConstantMessages.AccountConstant.AccountControllerConstant.SecurityCodeMessage + code;
                if (model.SelectedProvider == ConstantMessages.AccountConstant.AccountControllerConstant.Email)
                {
                    await _emailService.SendEmail(await _accountService.GetEmailAsync(user),
                        ConstantMessages.AccountConstant.AccountControllerConstant.SecurityCode, message);
                }
                else if (model.SelectedProvider == ConstantMessages.AccountConstant.AccountControllerConstant.Phone)
                {
                    await _emailService.SendSms(await _accountService.GetPhoneNumberAsync(user), message);
                }

                return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.VerifyCode,
                    new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl = null)
        {
            try
            {
                var loginInfo = await _accountService.GetExternalLoginInfoAsync();
                if (loginInfo == null)
                {
                    return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.LoginAction);
                }

                // Sign in the user with this external login provider if the user already has a login
                var result = await _accountService.ExternalLoginSignInAsync(_htmlEncoder.Encode(loginInfo.LoginProvider),
                                       _htmlEncoder.Encode(loginInfo.ProviderKey), isPersistent: false);
                if (result.Succeeded)
                {
                    return RedirectToLocal(returnUrl);
                }
                if (result.RequiresTwoFactor)
                {
                    return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.SendCode,
                        new { ReturnUrl = returnUrl, RememberMe = false });
                }
                if (result.IsLockedOut)
                {
                    return View(ConstantMessages.AccountConstant.AccountControllerConstant.Lockout);
                }
                else
                {
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.LoginProvider;
                    // REVIEW: handle case where email not in claims?
                    var email = loginInfo.Principal.FindFirstValue(ClaimTypes.Email);
                    return View(ConstantMessages.AccountConstant.AccountControllerConstant.ExternalLoginConfirmationView,
                        new ExternalLoginConfirmationModel { Email = email });
                }
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationModel model, string returnUrl = null)
        {
            try
            {
                if (_accountService.IsSignedIn(User))
                {
                    return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.Lockout,
                        ConstantMessages.AccountConstant.AccountControllerConstant.ManageController);
                }

                if (ModelState.IsValid)
                {
                    // Get the information about the user from the external login provider
                    var info = await _accountService.GetExternalLoginInfoAsync();
                    if (info == null)
                    {
                        return View(ConstantMessages.AccountConstant.AccountControllerConstant.ExternalLoginFailureView);
                    }
                    var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                    var result = await _accountService.CreateAsync(user);

                    // NOTE: Used for end to end testing only
                    //Just for automated testing adding a claim named 'ManageStore' - Not required for production
                    var manageClaim = info.Principal.Claims.Where(c => c.Type ==
                                 ConstantMessages.AccountConstant.AccountControllerConstant.ManageStore).FirstOrDefault();
                    if (manageClaim != null)
                    {
                        await _accountService.AddClaimAsync(user, manageClaim);
                    }

                    if (result.Succeeded)
                    {
                        result = await _accountService.AddLoginAsync(user, info);
                        if (result.Succeeded)
                        {
                            await _accountService.SignInAsync(user, isPersistent: false);
                            return RedirectToLocal(returnUrl);
                        }
                    }
                    AddErrors(result);
                }

                ViewBag.ReturnUrl = returnUrl;
                return View(model);
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> LogOff()
        {
            try
            {
                var userName = HttpContext.User.Identity.Name;
                // clear all items from the cart
                HttpContext.Session.Clear();

                await _accountService.SignOutAsync();
                _logger.LogInformation(ConstantMessages.AccountConstant.AccountControllerConstant.LoggedOutMessage, userName);
                return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.HomeIndexView,
                    ConstantMessages.AccountConstant.AccountControllerConstant.HomeController);
            }
            catch(Exception ex)
            {
                ErrorViewModel errorModel = GlobalExceptionHandler.GetErrorPage(ex.ToString());
                return View(ConstantMessages.AccountConstant.AccountControllerConstant.ErrorView, errorModel);
            }
        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
                _logger.LogWarning(ConstantMessages.AccountConstant.AccountControllerConstant.UserCreationErrorMessage, error.Description);
            }
        }
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(ConstantMessages.AccountConstant.AccountControllerConstant.HomeIndexView,
                     ConstantMessages.AccountConstant.AccountControllerConstant.HomeController);
            }
        }

        #endregion
    }
}