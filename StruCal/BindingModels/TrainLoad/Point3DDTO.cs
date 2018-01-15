using Common.Extensions;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class Point3DDTO
    {
        public double x { get; set; }
        public double y { get; set; }
        public double z { get; set; }

    }
    public static class ExtensionPoint3DDTO
    {
        public static Point3D ToPointD(this Point3DDTO point)
        {
            return new Point3D(point.x, point.y, point.z);
        }
        public static Point3DDTO ToPointDDTO(this Point3D point)
        {
            return new Point3DDTO
            {
                x = point.X,
                y = point.Y,
                z = point.Z,
            };
        }
    }

}
