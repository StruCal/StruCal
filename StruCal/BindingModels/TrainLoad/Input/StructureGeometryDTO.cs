using Calculators.TrainLoad;
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
    public static class ExtensionStructureGeometryDTO
    {
        public static StructureGeometry ToStructureGeometry(this StructureGeometryDTO structureGeometryDTO)
        {
            return new StructureGeometry
            {
                Bars = structureGeometryDTO.bars.Select(e=>e.ToBar()).ToList(),
                Supports=structureGeometryDTO.supports.Select(e=>e.ToSupport()).ToList()
            };
        }
    }
}
