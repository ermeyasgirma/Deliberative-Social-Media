using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CST_Group_Project.Models;
using System.Net.Mail;
using System.IO;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace CST_Group_Project.Helpers
{
    public class EmailsSender
    {

        private static Random random = new Random();
        private static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static string SendConfirmationEmail(ref Person person)
        {
            SmtpClient smtpClient = new SmtpClient("smtp.sendgrid.net", 587);

            smtpClient.Credentials = new System.Net.NetworkCredential("apikey", "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");
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

            MailMessage mailMessage = new MailMessage("kr469@cam.ac.uk", person.Email);
            
            mailMessage.IsBodyHtml = true;
            string path = @"./ConfrimEmailBody.html";
            string body;
            string url = "https://localhost:5001/";
            try
            {
                // Open the text file using a stream reader.
                using (var sr = new StreamReader(path))
                {
                    // Read the stream as a string, and write the string to the console.
                    body = sr.ReadToEnd();
                }
            }
            catch (IOException e)
            {
                Console.WriteLine("The file could not be read Probbably path is broken look for it in line 33 of EmailSender.cs ");
                Console.WriteLine(e.Message);
                return "The file could not be read Probbably path is broken look for it in line 33 of EmailSender.cs ";
            }

            person.Token = RandomString(20);
            mailMessage.Subject = "Verification email (Traverse)";
            person.TokenExpiration = DateTime.Now.AddHours(48);
            body = body.Replace("My video", String.Format(url+"api/Person/{0}/email/confirmed/{1}", person.Name, person.Token));

            mailMessage.Body = body;
            try
            {
                smtpClient.Send(mailMessage);
                return "Message Send you have 48h to confirm it";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        public static string SendResetPasswordEmail(ref Person person)
        {
            SmtpClient smtpClient = new SmtpClient("smtp.sendgrid.net", 587);

            smtpClient.Credentials = new System.Net.NetworkCredential("apikey", "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");
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

            MailMessage mailMessage = new MailMessage("kr469@cam.ac.uk", person.Email);

            mailMessage.IsBodyHtml = true;
            string path = @"./ResetPasswordBody.html";
            string body;
            try
            {
                // Open the text file using a stream reader.
                using (var sr = new StreamReader(path))
                {
                    // Read the stream as a string, and write the string to the console.
                    body = sr.ReadToEnd();
                }
            }
            catch (IOException e)
            {
                Console.WriteLine("The file could not be read Probbably path is broken look for it in line 78 of EmailSender.cs ");
                Console.WriteLine(e.Message);
                return "The file could not be read Probbably path is broken look for it in line 78 of EmailSender.cs ";
            }

            string url = "https://localhost:5001/";

            person.Token = RandomString(20);
            mailMessage.Subject = "Forgot Password Token: " + person.Token;
            person.TokenExpiration = DateTime.Now.AddHours(48);
            body = body.Replace("PASSWORD_RESET_LINK", String.Format(url+"reset", person.Name, person.Token));
            body = body.Replace("TOKEN_XYZ", person.Token);

            mailMessage.Body = body;
            try
            {
                smtpClient.Send(mailMessage);
                return "Message Send you have 48h to confirm it";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
    }
}
