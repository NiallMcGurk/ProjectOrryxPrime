using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProjectOrryxPrime.BusinessLogic;
using ProjectOrryxPrime.FunctionalAreas.Models;

namespace ProjectOrryxPrime.Controllers
{
    [ApiController]
    [Route("controller")]
    public class CreateAccountController : ControllerBase
    {
        private readonly IConfiguration _config;

        public CreateAccountController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("account")]
        public IActionResult CreateAccount([FromBody] AccountModel model)
        {
            CreateAccountBOL accountBOL = new CreateAccountBOL(this._config);
            int rowsAffected = accountBOL.CreateAccount(model);

            if (rowsAffected > 0)
                return Ok(new { Message = "Account created successfully." });
            else
                return StatusCode(500, new { Message = "Failed to create account." });
        }

        [HttpGet("account/{username}")]
        public IActionResult GetAccount(string email)
        {
            string connectionString = _config.GetConnectionString("DefaultConnection");
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT Username, Email FROM Accounts WHERE Email = @Email";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Email", email); 

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            AccountModel model = new AccountModel
                            {
                                Username = reader.GetString(reader.GetOrdinal("Username")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                            };

                            return Ok(model);
                        }
                        else
                        {
                            return NotFound(new { message = "Account not found." });
                        }
                    }
                }
            }
        }
    }
}