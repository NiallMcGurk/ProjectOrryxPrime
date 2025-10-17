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
                string query = "INSERT INTO Armies (Name, FactionType, Points, Detachment, AccountId) VALUES (@Name, @FactionType, @Points, @Detachment, @AccountId)";
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Name", armyModel.ArmyName);
                    cmd.Parameters.AddWithValue("@FactionType", armyModel.FactionType);
                    cmd.Parameters.AddWithValue("@Points", armyModel.Points);
                    cmd.Parameters.AddWithValue("@Detachment", armyModel.Detachment);
                    cmd.Parameters.AddWithValue("@AccountId", armyModel.AccountId);

                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected;
                }
            }
        }

        public List<ArmyModel> GetArmies(int accountId)
        {
            try
            {
                List<ArmyModel> armies = new List<ArmyModel>();
                string connectionString = _config.GetConnectionString("DefaultConnection");

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT * FROM Armies where AccountId = @AccountId";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@AccountId", accountId);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read()) 
                            {
                                armies.Add(new ArmyModel
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                    Faction = reader.GetString(reader.GetOrdinal("FactionType")),
                                    Points = reader.GetInt32(reader.GetOrdinal("Points")),
                                    Detachment = reader.GetInt32(reader.GetOrdinal("Detachment")),
                                });
                            }
                        }
                    }
                    return armies;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching account.", ex);
            }
        }
    }
}