using Microsoft.AspNetCore.Mvc;
using ProjectOrryxPrime.FunctionalAreas.Models;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Identity;
using ProjectOrryxPrime.FunctionalAreas;


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
            PasswordHashManager hashManager = new PasswordHashManager();
            model.Password = hashManager.HashPassword(model.Password);

            string passwordHash = hashManager.HashPassword(model.Password);

            string connectionString = _config.GetConnectionString("DefaultConnection");

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "INSERT INTO Accounts (Username, Email, PasswordHash) VALUES (@Username, @Email, @PasswordHash)";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Username", model.Username);
                    cmd.Parameters.AddWithValue("@Email", model.Email);
                    cmd.Parameters.AddWithValue("@PasswordHash", passwordHash);
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return Ok(new { rowsAffected });
                }
            }
        }
    }
}
