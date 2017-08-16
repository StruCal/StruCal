using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FEMCommon.DTO
{
    public class TriangleGeometry
    {
        public int Number { get; set; }
        public PointD Vertex1 { get; set; }
        public PointD Vertex2 { get; set; }
        public PointD Vertex3 { get; set; }
    }
}
