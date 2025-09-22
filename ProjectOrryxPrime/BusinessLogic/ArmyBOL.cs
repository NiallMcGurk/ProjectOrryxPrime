using Microsoft.Data.SqlClient;
using ProjectOrryxPrime.FunctionalAreas.Models;

namespace ProjectOrryxPrime.BusinessLogic
{
    public class ArmyBOL
    {
        private readonly IConfiguration _config;

        public ArmyBOL(IConfiguration config)
        {
            this._config = config;
        }

        public int CreateArmy(CreateArmyModel armyModel)
        {
            string connectionString = _config.GetConnectionString("DefaultConnection");

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                string query = "INSERT INTO Armies (ArmyUsername, Army, Points, Detachment) VALUES (@ArmyUsername, @Army, @Points, @Detachment)";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@ArmyUsername", armyModel.ArmyName);
                    cmd.Parameters.AddWithValue("@Army", armyModel.Faction);
                    cmd.Parameters.AddWithValue("@Points", armyModel.Points);
                    cmd.Parameters.AddWithValue("@Detachment", armyModel.Detachment);

                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected;
                }
            }
        }
    }
}
