using Common.Geometry;

namespace Calculators.TrainLoad
{
    public class Bar
    {
        public string Id { get; set; }
        public Point3D StartPoint { get; set; }
        public Point3D EndPoint { get; set; }
        public Section Section { get; set; }
        //public List<Additional> Additionals { get; set; }
    }
}