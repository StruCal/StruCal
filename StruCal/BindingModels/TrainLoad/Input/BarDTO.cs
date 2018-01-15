using Calculators.TrainLoad;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class BarDTO
    {
        public string id { get; set; }
        public Point3DDTO startPoint { get; set; }
        public Point3DDTO endPoint { get; set; }
        public SectionDTO section { get; set; }
        //public List<Additional> Additionals { get; set; }
    }

    public static class ExtensionBarDTO
    {
        public static Bar ToBar(this BarDTO barDTO)
        {
            return new Bar
            {
                Id=barDTO.id,
                StartPoint=barDTO.startPoint.ToPointD(),
                EndPoint=barDTO.endPoint.ToPointD(),
                Section=barDTO.section.ToSection(),
            };
        }
    }
}
