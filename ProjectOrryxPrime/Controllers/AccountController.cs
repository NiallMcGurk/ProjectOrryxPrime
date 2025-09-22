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

        [HttpPut("account")]
        public IActionResult UpdateAccount([FromBody] UpdateAccountModel model)
        {
            UpdateAccountBOL updateAccountBOL = new UpdateAccountBOL(this._config);
            int rowsAffected = updateAccountBOL.UpdateAccount(model);

            if(rowsAffected == -2)
            {
                return BadRequest(new { Error = "Password is invalid or does not meet requirements." });
            }
            ViewAccountModel viewAccountModel = new ViewAccountModel
            {
                Id = model.Id,
                Username = model.Username,
                Email = model.Email
            };

            if (viewAccountModel == null)
            {
                return Unauthorized(new { Message = "Invalid email or password." });
            }

            return Ok(viewAccountModel);
        }

        [HttpDelete("deleteAccount")]
        public IActionResult DeleteAccount([FromBody] int accountId)
        {
            AccountBOL accountBOL = new AccountBOL(this._config);
            int rowsAffected = accountBOL.DeleteAccount(accountId);
            if (rowsAffected > 0)
                return Ok(new { Message = "Account deleted successfully." });
            else
                return StatusCode(500, new { Message = "Failed to delete account." });
        }
    }
}