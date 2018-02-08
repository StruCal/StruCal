using Calculators.TrainLoad.GradienColor;
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

       public MeshColorResult ConvertToColor(ColorProvider colorProvider, double maxStress, double minStress)
        {
            var result = new MeshColorResult();
            result.BarId = this.BarId;
            result.MeshId = this.MeshId;
            result.VertexResults = this.VertexResults.Select(f => f.ConvertToColor(colorProvider, maxStress, minStress));
            return result;
        }

    }
}
