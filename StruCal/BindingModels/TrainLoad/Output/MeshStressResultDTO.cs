using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class MeshStressResultDTO
    {
        public string MeshId { get; set; }
        public string BarId { get; set; }
        public IEnumerable<VertexStressResultDTO> VertexResults { get; set; }
    }
}
