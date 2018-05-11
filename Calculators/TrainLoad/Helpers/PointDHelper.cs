using Common.Geometry;

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