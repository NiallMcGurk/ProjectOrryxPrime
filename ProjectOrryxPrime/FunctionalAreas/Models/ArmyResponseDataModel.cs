public class ArmyResponseDataModel
{
    public string ArmyName { get; set; }
    public int Points { get; set; }
    public string Faction { get; set; }
    public string Detachment { get; set; }

    public ArmyResponseDataModel(string armyName, string faction, int points, string detachment)
    {
        ArmyName = armyName;
        Faction = faction;
        Points = points;
        Detachment = detachment;
    }
}