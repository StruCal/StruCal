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
}
