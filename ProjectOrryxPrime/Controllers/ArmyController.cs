using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ProjectOrryxPrime.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArmyController : ControllerBase
    {
        private readonly IConfiguration _config;

        public ArmyController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        public IActionResult CreateArmy([FromBody] ArmyModel armyModel)
        {
            string connectionString = _config.GetConnectionString("DefaultConnection");

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "INSERT INTO Armies (ArmyUsername, Army, Points) VALUES (@ArmyUsername, @Army, @Points)";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@ArmyUsername", armyModel.ArmyUsername);
                    cmd.Parameters.AddWithValue("@Army", armyModel.Type);
                    cmd.Parameters.AddWithValue("@Points", armyModel.PointSize);

                    int rowsAffected = cmd.ExecuteNonQuery();
                    return Ok(new { rowsAffected });
                }
            }
        }
    }
}
