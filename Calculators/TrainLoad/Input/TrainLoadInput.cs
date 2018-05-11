using Calculators.TrainLoad.Input;
using System.Collections.Generic;

namespace Calculators.TrainLoad
{
    public class TrainLoadInput
    {
        public string MaxColor { get; set; }
        public string MinColor { get; set; }
        public string MiddleColor { get; set; }
        public StructureGeometry StructureGeometry { get; set; }
        public List<VertexInput> Vertices { get; set; }
        public MovingLoad MovingLoads { get; set; }
        public TimeSettings TimeSettings { get; set; }
    }

    //public class Additional
    //{
    //    public Perimeter Perimeter { get; set; }
    //    public double Depth { get; set; }
    //}
}