public class CreateArmy
{
    public CreateArmy(string armyUsername, ArmyType army, int points)
    {
        this.armyUsername = armyUsername;
        this.army = army;
        this.points = points;
    }
    public string armyUsername { get; set; }
    public int points { get; set; }
    public ArmyType army { get; set; }
}