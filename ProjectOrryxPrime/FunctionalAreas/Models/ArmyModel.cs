namespace ProjectOrryxPrime.FunctionalAreas.Models
{
    public class ArmyModel
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required string Faction { get; set; }
        public required int Points { get; set; }
        public required int Detachment { get; set; }
    }
}
