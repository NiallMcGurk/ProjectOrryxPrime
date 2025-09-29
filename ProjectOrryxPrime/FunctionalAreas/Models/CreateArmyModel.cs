using System.Net.Mail;

namespace ProjectOrryxPrime.FunctionalAreas.Models
{
    public class CreateArmyModel
    {
        public string ArmyName { get; set; }
        public int Points { get; set; }
        public string FactionType { get; set; }
        public DetachmentOrksEnum Detachment { get; set; }

        public CreateArmyModel(string armyName, FactionEnum faction, int points, DetachmentOrksEnum detachment)
        {
            ArmyName = armyName;
            FactionType = faction.ToString();
            Points = points;
            Detachment = detachment;
        }
    }
}
