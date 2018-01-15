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
        public string Id { get; set; }
        public Point3D StartPoint { get; set; }
        public Point3D EndPoint { get; set; }
        public SectionDTO Section { get; set; }
        //public List<Additional> Additionals { get; set; }
    }
}
