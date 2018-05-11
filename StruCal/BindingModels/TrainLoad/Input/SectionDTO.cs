using Calculators.TrainLoad;
using System.Collections.Generic;
using System.Linq;

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
                Perimeters = sectionDTO.perimeters.Select(e => e.ToPerimeter()).ToList(),
            };
        }
    }
}