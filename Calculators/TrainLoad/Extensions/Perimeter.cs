using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FEMPerimeter = FEM2DCommon.Sections.Perimeter;
namespace Calculators.TrainLoad.Extensions
{
    public static class PerimeterExtensions
    {
        public static FEMPerimeter Convert(this Perimeter perimeter)
        {
            var femPerimeter = new FEMPerimeter(perimeter.Coordinates.ToList());
       
            return femPerimeter;
        }
        public static List<FEMPerimeter> Convert(this IEnumerable<Perimeter> perimeters)
        {
            return perimeters.Select(e => e.Convert()).ToList();
        }
    }
}
