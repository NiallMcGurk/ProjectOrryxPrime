using Microsoft.AspNetCore.Mvc;
using ProjectOrryxPrime.FunctionalAreas.Models;

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

            return Ok(viewAccountModel);
        }
    }
}