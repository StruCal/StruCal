using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad
{
    public class Vertex
    {
        public string BarId { get; set; }
        public string MeshId { get; set; }
        public List<Point3D> Vertices { get; set; }
    }
}
