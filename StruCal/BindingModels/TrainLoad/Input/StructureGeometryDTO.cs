using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class StructureGeometryDTO
    {
        public List<BarDTO> bars { get; set; }
        public List<SupportDTO> supports { get; set; }
    }
}
