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
        public string MeshId { get; set; }
        public string BarId { get; set; }
        public IEnumerable<VertexColorResultDTO> VertexResults { get; set; }
    }
}
