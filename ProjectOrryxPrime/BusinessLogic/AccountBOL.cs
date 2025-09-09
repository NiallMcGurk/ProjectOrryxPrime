using Microsoft.Data.SqlClient;
using ProjectOrryxPrime.FunctionalAreas;
using ProjectOrryxPrime.FunctionalAreas.Models;
using System.Data;
using System.Reflection;

namespace ProjectOrryxPrime.BusinessLogic
{
    public class AccountBOL
    {
        private readonly IConfiguration _config;

        public AccountBOL(IConfiguration config)
        {
            this._config = config;
        }

        public int CreateAccount(CreateAccountModel model)
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

        public ViewAccountModel? GetAccount(LoginDetailsModel loginDetailsModel)
        {
            try
            {
                string connectionString = _config.GetConnectionString("DefaultConnection");
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    string query = "SELECT Username, PasswordHash, Email FROM Accounts WHERE Email = @Email";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        // Defines the email parameter
                        cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 256).Value = loginDetailsModel.Email;

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                string passwordHash = reader.GetString(reader.GetOrdinal("PasswordHash"));

                                PasswordHashManager hashManager = new PasswordHashManager();
                                if (hashManager.VerifyPassword(passwordHash, loginDetailsModel.Password))
                                {
                                    return new ViewAccountModel
                                    {
                                        Username = reader.GetString(reader.GetOrdinal("Username")),
                                        Email = reader.GetString(reader.GetOrdinal("Email")),
                                    };
                                }
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