using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Output
{

    public class MeshColorResult
    {
        public string MeshId { get; set; }
        public string BarId { get; set; }
        public IEnumerable<VertexColorResult> VertexResults { get; set; }
    }
}
