public class ArmyModel
{
    public string ArmyUsername { get; set; } = string.Empty;
    public int PointSize { get; set; }
    public ArmyType Type { get; set; }

    private const int DefaultPointsLimit = 2000;

    public ArmyModel(string armyUsername, ArmyType type, int? pointSize = null)
    {
        ArmyUsername = armyUsername;
        Type = type;
        PointSize = pointSize ?? DefaultPointsLimit;
    }
}