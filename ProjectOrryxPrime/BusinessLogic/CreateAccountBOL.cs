using Microsoft.Data.SqlClient;
using ProjectOrryxPrime.FunctionalAreas;
using ProjectOrryxPrime.FunctionalAreas.Models;

namespace ProjectOrryxPrime.BusinessLogic
{
    public class CreateAccountBOL
    {
        private readonly IConfiguration _config;

        public CreateAccountBOL(IConfiguration config)
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
    }
}
