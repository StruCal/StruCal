using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StruCal.BindingModels
{
    public class PointDDTO
    {
        public double x { get; set; }
        public double y { get; set; }
    }

    public static class ExtensionPointDDTO
    {
        public static PointD ToPointD(this PointDDTO point)
        {
            return new PointD(point.x, point.y);
        }
        public static PointDDTO ToPointDDTO(this PointD point)
        {
            return new PointDDTO
            {
                x = point.X,
                y = point.Y,
            };
        }
    }
}