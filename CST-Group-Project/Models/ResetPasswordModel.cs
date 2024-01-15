using System.ComponentModel.DataAnnotations;

namespace JWTAuthentication.Authentication
{
    public class ResetPasswordModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Token is required")]
        public string Token { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string NewPassword { get; set; }
    }
}