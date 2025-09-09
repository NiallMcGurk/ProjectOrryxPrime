using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProjectOrryxPrime.BusinessLogic;
using ProjectOrryxPrime.FunctionalAreas;
using ProjectOrryxPrime.FunctionalAreas.Models;

namespace ProjectOrryxPrime.Controllers
{
    [ApiController]
    [Route("accountController")]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AccountController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("account")]
        public IActionResult CreateAccount([FromBody] CreateAccountModel model)
        {
            AccountBOL accountBOL = new AccountBOL(this._config);
            int rowsAffected = accountBOL.CreateAccount(model);

            if (rowsAffected > 0)
                return Ok(new { Message = "Account created successfully." });
            else
                return StatusCode(500, new { Message = "Failed to create account." });
        }

        internal ViewAccountModel? GetAccount(LoginDetailsModel loginDetailsModel)
        {
            if (loginDetailsModel.Password != null && loginDetailsModel.Email != null)
            {
                ViewAccountModel? viewAccountModel = new AccountBOL(this._config).GetAccount(loginDetailsModel);
                if (viewAccountModel != null)
                {
                    return viewAccountModel;
                }
            }
            return null;
        }
    }
}