using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class VertexInputDTO
    {
        public string barId { get; set; }
        public string meshId { get; set; }
        public List<Point3DDTO> vertices { get; set; }
    }
}
