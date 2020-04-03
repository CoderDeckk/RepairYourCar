using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace APS.Service.interfaces
{
    public interface IEmailService
    {
        Task SendEmail(string email, string subject, string message);
        Task SendSms(string number, string message);
    }
}
