using System.Collections.Generic;

namespace Calculators.TrainLoad.Output
{
    public class MeshColorResult
    {
        public string MeshId { get; set; }
        public string BarId { get; set; }
        public IEnumerable<VertexColorResult> VertexResults { get; set; }
    }
}