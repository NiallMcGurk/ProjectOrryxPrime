using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProjectOrryxPrime.BusinessLogic;
using ProjectOrryxPrime.FunctionalAreas;
using ProjectOrryxPrime.FunctionalAreas.Models;

namespace ProjectOrryxPrime.Controllers
{
    [ApiController]
    [Route("controller")]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AccountController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("account")]
        public IActionResult CreateAccount([FromBody] AccountModel model)
        {
            AccountBOL accountBOL = new AccountBOL(this._config);
            int rowsAffected = accountBOL.CreateAccount(model);

            if (rowsAffected > 0)
                return Ok(new { Message = "Account created successfully." });
            else
                return StatusCode(500, new { Message = "Failed to create account." });
        }

        [HttpGet("account")]
        public IActionResult GetAccount(string? email, string? password)
        {
            if (password != null || email != null)
            {
                AccountModel? accountModel = new AccountBOL(this._config).GetAccount(email);
                if (accountModel != null)
                {
                    PasswordHashManager hashManager = new PasswordHashManager();
                    hashManager.VerifyPassword(accountModel.Password, password);
                    return Ok(accountModel);
                }
            }
            return NotFound(new { message = "Account not found." });
        }
    }
}