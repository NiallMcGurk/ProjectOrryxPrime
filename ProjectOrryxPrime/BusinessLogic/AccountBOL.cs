using Microsoft.Data.SqlClient;
using ProjectOrryxPrime.FunctionalAreas;
using ProjectOrryxPrime.FunctionalAreas.Models;
using System.Data;

namespace ProjectOrryxPrime.BusinessLogic
{
    public class AccountBOL
    {
        private readonly IConfiguration _config;

        public AccountBOL(IConfiguration config)
        {
            this._config = config;
        }

        public int CreateAccount(AccountModel model)
        {
            PasswordHashManager hashManager = new PasswordHashManager();
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
                    return rowsAffected;
                }
            }
        }

        public AccountModel? GetAccount(string email)
        {
            try
            {
                string connectionString = _config.GetConnectionString("DefaultConnection");
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT Username, PasswordHash FROM Accounts WHERE Email = @Email";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 256).Value = email;

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                AccountModel model = new AccountModel
                                {
                                    Username = reader.GetString(reader.GetOrdinal("Username")),
                                    Password = reader.GetString(reader.GetOrdinal("PasswordHash")),
                                    Email = email,
                                };

                                return model;
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