using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

class Program
{
    static void Main()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("C:\\Users\\niall\\source\\repos\\NiallMcGurk\\ProjectOrryxPrime\\ProjectOrryxPrime\\appsettings.json");

        IConfiguration config = builder.Build();

        string connectionString = config.GetConnectionString("DefaultConnection");

        CreateArmy myArmy = new CreateArmy("Evil Sunz", ArmyType.Orks, 2000);

        Console.WriteLine($"Army created: " + myArmy.armyUsername + " - " + myArmy.army + " - " + myArmy.points + " points");

        string query = "INSERT INTO Armies (ArmyUsername, Army, Points) VALUES (@ArmyUsername, @Army, @Points)";

        using (SqlConnection conn = new SqlConnection(connectionString))
        {
            try
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@ArmyUsername", myArmy.armyUsername);
                    cmd.Parameters.AddWithValue("@Army", myArmy.army);
                    cmd.Parameters.AddWithValue("@Points", myArmy.points);

                    int rowsAffected = cmd.ExecuteNonQuery();

                    Console.WriteLine($"Data inserted. {rowsAffected} row(s) affected.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
            }
        }
    }
}