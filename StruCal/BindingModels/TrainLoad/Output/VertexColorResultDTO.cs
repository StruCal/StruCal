using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class VertexColorResultDTO
    {
        public Point3D Position { get; set; }
        public double Displacement { get; set; }

        public string Color { get; set; }
    }
}
