using Common.Geometry;
using System.Collections.Generic;

namespace Calculators.TrainLoad
{
    public class VertexInput
    {
        public string BarId { get; set; }
        public string MeshId { get; set; }
        public List<Point3D> Vertices { get; set; }
    }
}