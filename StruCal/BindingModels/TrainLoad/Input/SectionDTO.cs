using Calculators.TrainLoad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class SectionDTO
    {
        public List<PerimeterDTO> perimeters { get; set; }
    }

    public static class ExtensionSectionDTO
    {
        public static Section ToSection(this SectionDTO sectionDTO)
        {
            return new Section
            {
                Perimeters=sectionDTO.perimeters.Select(e=>e.ToPerimeter()).ToList(),
            };
        }
    }
}
