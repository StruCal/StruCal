using Calculators.TrainLoad;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class PerimeterDTO
    {
        public List<PointDDTO> coordinates { get; set; }
    }

    public static class ExtensionPerimeterDTO
    {
        public static Perimeter ToPerimeter(this PerimeterDTO perimeterDTO)
        {
            return new Perimeter
            {
                Coordinates = perimeterDTO.coordinates.Select(e => e.ToPointD()).ToList(),
            };
        }
    }
}
