using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Helpers
{
    internal static class PointDHelper
    {
        public static PointD ToFEMCoordinateSystem(this Point3D point)
        {
            return new PointD(point.Z, point.Y);
        }
    }
}
