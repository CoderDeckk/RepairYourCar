using System;
using System.Collections.Generic;
using System.Text;

namespace APS.CommonModel.commonentities
{
    public static class ConstantMessages
    {
        public static class AccountConstant
        {
            public static class AccountServiceConstant
            {

            }
            public static class AccountRepositoryConstant
            {
                public const string AdminRole = "Admin";
            }
            public static class AccountControllerConstant
            {
                public const string LoggedInUserLog = "Logged in {userName}.";
                public const string SendCode = "SendCode.";
                public const string Lockout = "Lockout";
                public const string ErrorView = "Error";
                public const string ForgotPasswordConfirmation = "ForgotPasswordConfirmation.";
                public const string FailedToLoginMessage = "Failed to log in {userName}.";
                public const string InvalidAttempt = "Invalid login attempt.";
                public const string InvalidCode = "Invalid code.";
                public const string UserCreated = "User {userName} was created.";
                public const string ConfirmEmail = "ConfirmEmail";
                public const string Email = "Email";
                public const string Account = "Account";
                public const string ConfirmAccount = "Confirm your account";
                public const string ConfirmAccountMessage= "Please confirm your account by clicking this link: <a href=\\";
                public const string HomeIndexView = "Index";
                public const string HomeController = "Home";
                public const string AccountController = "Account";
                public const string ResetPassword = "ResetPassword";
                public const string ResetPasswordConfirmation = "ResetPasswordConfirmation";
                public const string ResetPasswordMessage = "Reset Password";
                public const string ResetPasswordLinkMessage = "Please reset your password by clicking here: <a href=\\";
                public const string AccountNotFoundMessage = "We could not locate an account with email : {0}";
                public const string ExternalLoginCallback = "ExternalLoginCallback";
                public const string ExternalLoginConfirmationView = "ExternalLoginConfirmation";
                public const string SecurityCodeMessage = "Your security code is: ";
                public const string SecurityCode = "Security Code";
                public const string Phone = "Phone";
                public const string VerifyCode = "VerifyCode";
                public const string LoginAction = "Login";
                public const string ManageController = "Manage";
                public const string ExternalLoginFailureView = "ExternalLoginFailure";
                public const string ManageStore = "ManageStore";
                public const string LoggedOutMessage = "{userName} logged out.";
                public const string UserCreationErrorMessage = "Error in creating user: {error}";
            }

        }

        public static class MasterConstant
        {
            public const string Country = "Country";
        
        }
    }
}
