using APS.Service.interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace APS.Service.services
{
   public class EmailService :IEmailService
    {
       
        public EmailService()
        {

        }
        public Task SendEmail(string email, string subject, string message)
        {
            try
            {
                // Plug in your email service
               return Task.FromResult(0);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public  Task SendSms(string number, string message)
        {
            // Plug in your sms service
            return Task.FromResult(0);
        }
    }
}
