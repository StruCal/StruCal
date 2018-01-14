using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Output
{
    public class ResultData
    {
        public double MaxAbsoluteDisplacement { get; set; }
        public IEnumerable<TimeResult> TimeResults { get; set; }
    }

    public class TimeResult
    {
        public double Time { get; set; }
        public double MaxStress { get; set; }
        public double MinStress { get; set; }
        public IEnumerable<MeshResult> PositionResults { get; set; }
    }

    public class VertexResult
    {
        public Point3D Position { get; set; }
        public double Displacement { get; set; }

        public string Color { get; set; }
    }

    public class MeshResult
    {
        public string MeshId { get; set; }
        public string BarId { get; set; }
        public IEnumerable<VertexResult> VertexResults { get; set; }
    }

    
}
