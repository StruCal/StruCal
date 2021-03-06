﻿using Common.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Geometry
{
    /// <summary>
    /// Base class for representating double point
    /// </summary>
    public class PointD : IEquatable<PointD>
    {
        public double X { get; set; }
        public double Y { get; set; }

        public PointD(double x, double y)
        {
            this.X = x;
            this.Y = y;
        }
        public PointD() { }
        public override bool Equals(object obj)
        {
            PointD other = obj as PointD;
            if (other == null)
                return false;
            return this.Equals(other);
        }
        public override int GetHashCode()
        {
            return this.X.GetHashCode() ^ this.Y.GetHashCode();
        }

        public bool Equals(PointD other)
        {
            return (this.X.IsApproximatelyEqualTo(other.X)
                && this.Y.IsApproximatelyEqualTo(other.Y));
        }

        public static bool operator ==(PointD point1, PointD point2)
        {
            return point1.Equals(point2);
        }
        public static bool operator !=(PointD point1, PointD point2)
        {
            return !(point1 == point2);
        }

        public PointD Move(PointD point)
        {
            var result = new PointD(this.X + point.X, this.Y + point.Y);
            return result;
        }

        public PointD Move(double x, double y)
        {
            return this.Move(new PointD(x, y));
        }

    }
}
