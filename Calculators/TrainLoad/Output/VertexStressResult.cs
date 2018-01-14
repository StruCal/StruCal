using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Output
{
    public class VertexStressResult
    {
        public Point3D Position { get; set; }
        public double Displacement { get; set; }
        public double Stress { get; set; }
    }
}
