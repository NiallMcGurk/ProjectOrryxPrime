using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ProjectOrryxPrime.FunctionalAreas.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProjectOrryxPrime.Controllers
{
    [ApiController]
    [Route("loginController")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            this._config = config;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult GetLoginDetails([FromBody] LoginDetailsModel loginDetailsModel)
        {
            ViewAccountModel viewAccountModel = new AccountController(this._config).GetAccount(loginDetailsModel);

            if(viewAccountModel == null)
            {
                return Unauthorized(new { Message = "Invalid email or password." });
            }

            var jwtSettings = _config.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserId", viewAccountModel.Id.ToString()),
                    new Claim(ClaimTypes.Email, viewAccountModel.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = jwtSettings["Issuer"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return Ok(new
            {
                token = jwt,
                username = viewAccountModel.Username,
                email = viewAccountModel.Email,
                id = viewAccountModel.Id
            });
        }
    }
}