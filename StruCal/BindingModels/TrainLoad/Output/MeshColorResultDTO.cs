using Calculators.TrainLoad.Output;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{

    public class MeshColorResultDTO
    {
        public string meshId { get; set; }
        public string barId { get; set; }
        public IEnumerable<VertexColorResultDTO> vertexResults { get; set; }
    }
    public static class ExtensionMeshColorResultDTO
    {
        public static MeshColorResultDTO ToMeshColorResultDTO(this MeshColorResult meshColorResult)
        {
            return new MeshColorResultDTO
            {
                barId = meshColorResult.BarId,
                meshId = meshColorResult.MeshId,
                vertexResults = meshColorResult.VertexResults.Select(e => e.ToVertexColorResultDTO()).ToList(),
            };
        }
    }
}
