using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Output
{
    public class MeshStressResult
    {
        public string MeshId { get; private set; }
        public string BarId { get; private set; }
        public IEnumerable<VertexStressResult> VertexResults { get; private set; }

        public static MeshStressResult GenerateMeshResult(VertexInput beamVertex, List<VertexStressResult> vertexResults)
        {
            return new MeshStressResult
            {
                BarId = beamVertex.BarId,
                MeshId = beamVertex.MeshId,
                VertexResults = vertexResults,
            };
        }

       
    }
}
