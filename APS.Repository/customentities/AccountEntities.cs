using System;
using System.Collections.Generic;
using System.Text;

namespace APS.Repository.customentities
{
    public class ExternalLoginConfirmationEntity
    {
        public string Email { get; set; }
    }

    public class ExternalLoginListEntity
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeModelEntity
    {
        public string SelectedProvider { get; set; }
       // public ICollection<SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeEntity
    {
        public string Provider { get; set; }
        public string Code { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberBrowser { get; set; }
        public bool RememberMe { get; set; }
    }

   
    public class LoginEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }       
    }

    public class RegisterEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class ResetPasswordEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordEntity
    {
        public string Email { get; set; }
    }
}
