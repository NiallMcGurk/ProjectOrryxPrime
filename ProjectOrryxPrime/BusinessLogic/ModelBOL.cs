using Microsoft.Data.SqlClient;
using ProjectOrryxPrime.FunctionalAreas.Models;
using System.Reflection;

namespace ProjectOrryxPrime.BusinessLogic
{
    public class ModelBOL
    {
        private readonly IConfiguration _config;

        public ModelBOL(IConfiguration config)
        {
            this._config = config;
        }

        public ViewModelModel GetModel(string factionType)
        {
            try
            {
                string connectionString = _config.GetConnectionString("DefaultConnection");
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT * FROM Models WHERE FactionType = @FactionType";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@FactionType", factionType);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                return new ViewModelModel
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                    FactionType = reader.GetString(reader.GetOrdinal("FactionType")),
                                    FactionRuleId = reader.GetInt32(reader.GetOrdinal("FactionRuleId")),
                                    StatsId = reader.GetInt32(reader.GetOrdinal("StatsId"))
                                };
                            }
                            else
                            {
                                throw new Exception("No model found.");
                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving the model.", ex);
            }
        }
    }
}
