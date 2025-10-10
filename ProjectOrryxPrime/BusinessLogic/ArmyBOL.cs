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
                string query = "INSERT INTO Armies (Name, FactionType, Points, Detachment) VALUES (@Name, @FactionType, @Points, @Detachment)";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Name", armyModel.ArmyName);
                    cmd.Parameters.AddWithValue("@FactionType", armyModel.FactionType);
                    cmd.Parameters.AddWithValue("@Points", armyModel.Points);
                    cmd.Parameters.AddWithValue("@Detachment", armyModel.Detachment);

                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected;
                }
            }
        }

        public ArmyModel? GetArmies()
        {
            // TO-DO: Debug Typescript page to figure out why its erroring.
            try
            {
                string connectionString = _config.GetConnectionString("DefaultConnection");

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT * FROM Armies";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                return new ArmyModel
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                    Faction = reader.GetString(reader.GetOrdinal("FactionType")),
                                    Points = reader.GetInt32(reader.GetOrdinal("Points")),
                                    Detachment = reader.GetInt32(reader.GetOrdinal("Detachment")),
                                };
                            }
                        }
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching account.", ex);
            }
        }
    }
}