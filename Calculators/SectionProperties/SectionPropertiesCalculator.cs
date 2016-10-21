using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.SectionProperties
{
    namespace SectionProperties.Calculations
    {
        /// <summary>
        /// class calculates properties of given section
        /// result is given as Dictionary
        /// </summary>
        public class SectionPropertiesCalculations
        {

            public PointD CoordinatesOfCentreOfGravity { get; private set; }
            public SectionPropertiesCalculations()
            {

            }
            public Dictionary<SectionCharacteristic, double> CalculateProperties(SectionData section)
            {


                //calculations of outer primeter
                double F = 0;
                double Sx = 0;
                double Sy = 0;
                double Ix = 0;
                double Iy = 0;
                double Ixy = 0;
                foreach (SectionCoordinates coord in section.OuterPerimeters)
                {
                    for (int i = 0; i <= coord.Coordinates.Count - 2; i++)
                    {
                        double x1, x2, y1, y2;
                        x1 = coord.Coordinates[i].X;
                        x2 = coord.Coordinates[i + 1].X;
                        y1 = coord.Coordinates[i].Y;
                        y2 = coord.Coordinates[i + 1].Y;
                        F = F + (x1 - x2) * (y2 + y1);
                        Sx = Sx + (x1 - x2) * (y1 * y1 + y1 * y2 + y2 * y2);
                        Sy = Sy + (y2 - y1) * (x1 * x1 + x1 * x2 + x2 * x2);
                        Ix = Ix + (x1 - x2) * (y1 * y1 * y1 + y1 * y1 * y2 + y1 * y2 * y2 + y2 * y2 * y2);
                        Iy = Iy + (y2 - y1) * (x1 * x1 * x1 + x1 * x1 * x2 + x1 * x2 * x2 + x2 * x2 * x2);
                        Ixy = Ixy + (x1 - x2) * (x1 * (3 * y1 * y1 + y2 * y2 + 2 * y1 * y2) + x2 * (3 * y2 * y2 + y1 * y1 + 2 * y1 * y2));
                    }
                }

                //iner perimeters
                foreach (SectionCoordinates coord in section.InnerPerimeters)
                {
                    for (int i = 0; i <= coord.Coordinates.Count - 2; i++)
                    {
                        double x1, x2, y1, y2;
                        x1 = coord.Coordinates[i].X;
                        x2 = coord.Coordinates[i + 1].X;
                        y1 = coord.Coordinates[i].Y;
                        y2 = coord.Coordinates[i + 1].Y;
                        F = F - (x1 - x2) * (y2 + y1);
                        Sx = Sx - (x1 - x2) * (y1 * y1 + y1 * y2 + y2 * y2);
                        Sy = Sy - (y2 - y1) * (x1 * x1 + x1 * x2 + x2 * x2);
                        Ix = Ix - (x1 - x2) * (y1 * y1 * y1 + y1 * y1 * y2 + y1 * y2 * y2 + y2 * y2 * y2);
                        Iy = Iy - (y2 - y1) * (x1 * x1 * x1 + x1 * x1 * x2 + x1 * x2 * x2 + x2 * x2 * x2);
                        Ixy = Ixy - (x1 - x2) * (x1 * (3 * y1 * y1 + y2 * y2 + 2 * y1 * y2) + x2 * (3 * y2 * y2 + y1 * y1 + 2 * y1 * y2));
                    }
                }

                //applying mulipliers
                F = F / 2;
                Sx = Sx / 6;
                Sy = Sy / 6;
                Ix = Ix / 12;
                Iy = Iy / 12;
                Ixy = Ixy / 24;


                double x0 = Sy / F;
                double y0 = Sx / F;
                this.CoordinatesOfCentreOfGravity = new PointD(x0, y0);

                //in central coordinate system
                double Ix0 = Ix - F * y0 * y0;
                double Iy0 = Iy - F * x0 * x0;
                double Ixy0 = Ixy - F * x0 * y0;

                //principal properties
                double I1 = (Ix0 + Iy0) / 2 + 0.5 * Math.Sqrt(Math.Pow(Iy0 - Ix0, 2) + 4 * Ixy0 * Ixy0);
                double I2 = (Ix0 + Iy0) / 2 - 0.5 * Math.Sqrt(Math.Pow(Iy0 - Ix0, 2) + 4 * Ixy0 * Ixy0);

                //rectangle
                double h = Math.Sqrt(12 * Ix0 / F);
                double b = F / h;

                //alfa
                double alfa = Math.Atan(Ixy0 / (Iy0 - I1));
                if (double.IsNaN(alfa))
                    alfa = Math.PI / 2;
                //extreme coordinates
                ExtremeDistances extremeCoordinates = new ExtremeDistances(new PointD(x0, y0));

                /*var extremeCentral = extremeCoordinates.maxDistancesCentralCoordinateSystem(section.OuterPerimeters);
                var extremePrincipal = extremeCoordinates.maxDistancesPrincipalCoordinateSystem(section.OuterPerimeters, alfa);
                double x0_max = extremeCentral.Item1;
                double x0_min = extremeCentral.Item2;
                double y0_max = extremeCentral.Item3;
                double y0_min = extremeCentral.Item4;
                double xI_max = extremePrincipal.Item1;
                double xI_min = extremePrincipal.Item2;
                double yI_max = extremePrincipal.Item3;
                double yI_min = extremePrincipal.Item4;*/
                double x0_max, x0_min, y0_max, y0_min;
                double xI_max, xI_min, yI_max, yI_min;

                extremeCoordinates.maxDistancesCentralCoordinateSystem(section.OuterPerimeters, out x0_max, out x0_min, out y0_max, out y0_min);
                extremeCoordinates.maxDistancesPrincipalCoordinateSystem(section.OuterPerimeters, alfa, out xI_max, out xI_min, out yI_max, out yI_min);


                //creating dictionary with results
                Dictionary<SectionCharacteristic, double> results = new Dictionary<SectionCharacteristic, double>(); //dictionary with results
                results.Add(SectionCharacteristic.alfa, alfa);
                results.Add(SectionCharacteristic.b, b);
                results.Add(SectionCharacteristic.F, F);
                results.Add(SectionCharacteristic.h, h);
                results.Add(SectionCharacteristic.I1, I1);
                results.Add(SectionCharacteristic.I2, I2);
                results.Add(SectionCharacteristic.Ix, Ix);
                results.Add(SectionCharacteristic.Ix0, Ix0);
                results.Add(SectionCharacteristic.Ixy, Ixy);
                results.Add(SectionCharacteristic.Ixy0, Ixy0);
                results.Add(SectionCharacteristic.Iy, Iy);
                results.Add(SectionCharacteristic.Iy0, Iy0);
                results.Add(SectionCharacteristic.Sx, Sx);
                results.Add(SectionCharacteristic.Sy, Sy);
                results.Add(SectionCharacteristic.x0_max, x0_max);
                results.Add(SectionCharacteristic.x0_min, x0_min);
                results.Add(SectionCharacteristic.xI_max, xI_max);
                results.Add(SectionCharacteristic.xI_min, xI_min);
                results.Add(SectionCharacteristic.x0, x0);
                results.Add(SectionCharacteristic.y0_max, y0_max);
                results.Add(SectionCharacteristic.y0_min, y0_min);
                results.Add(SectionCharacteristic.yI_max, yI_max);
                results.Add(SectionCharacteristic.yI_min, yI_min);
                results.Add(SectionCharacteristic.y0, y0);
                return results;
            }


        }
        public class ExtremeDistances
        {
            /// <summary>
            /// Class finds max coordinates of the section
            /// </summary>
            /// the Tuple arguments are
            /// x0_max,x0_min,y0_max,y0_min
            /// <returns></returns>
            /// 
            private PointD centreOfGravity;//coordinates of the centre of gravity
            public ExtremeDistances(PointD centreOfGravity)
            {
                this.centreOfGravity = centreOfGravity;
            }
            public void maxDistancesCentralCoordinateSystem(List<SectionCoordinates> sections, out double x0_max, out double x0_min, out double y0_max, out double y0_min) //przekształcenia wspołrzędnych i obliczenie maksymalncyh odleglosci
            {
                //Tuple=> x0_max,x0_min,y0_max,y0_min
                x0_max = sections.Max(section => section.Coordinates.Max(point => point.X)) - this.centreOfGravity.X;
                x0_min = sections.Min(section => section.Coordinates.Min(point => point.X)) - this.centreOfGravity.X;
                y0_max = sections.Max(section => section.Coordinates.Max(point => point.Y)) - this.centreOfGravity.Y;
                y0_min = sections.Min(section => section.Coordinates.Min(point => point.Y)) - this.centreOfGravity.Y;

            }
            public void maxDistancesPrincipalCoordinateSystem(List<SectionCoordinates> sections, double alfa, out double x_max, out double x_min, out double y_max, out double y_min) //przekształcenia wspołrzędnych i obliczenie maksymalncyh odleglosci
            {
                double cos = Math.Cos(alfa);
                double sin = Math.Sin(alfa);

                //coordinate of teh centre of gravity in rotated coordinate system
                double xo = this.centreOfGravity.X * cos - this.centreOfGravity.Y * sin;
                double yo = this.centreOfGravity.X * sin + this.centreOfGravity.Y * cos;

                x_max = sections.Max(section => section.Coordinates.Max(point => point.X * cos - point.Y * sin)) - xo;
                x_min = sections.Min(section => section.Coordinates.Min(point => point.X * cos - point.Y * sin)) - xo;
                y_max = sections.Max(section => section.Coordinates.Max(point => point.X * sin + point.Y * cos)) - yo;
                y_min = sections.Min(section => section.Coordinates.Min(point => point.X * sin + point.Y * cos)) - yo;
            }

        }
        public enum SectionCharacteristic
        {
            F,
            Sx,
            Sy,
            Ix,
            Iy,
            Ixy,
            Ix0,
            Iy0,
            Ixy0,
            I1,
            I2,
            alfa,
            x0_max,
            x0_min,
            y0_max,
            y0_min,
            xI_max,
            xI_min,
            yI_max,
            yI_min,
            x0,
            y0,
            b,
            h
        };
        
        public class SectionData
        {
            public List<SectionCoordinates> OuterPerimeters { get; set; }
            public List<SectionCoordinates> InnerPerimeters { get; set; }

        }

        public class SectionCoordinates
        {
            public IList<PointD> Coordinates { get; set; }
            
            public SectionCoordinates(IList<PointD> coordinates)
            {
                this.Coordinates = checkIfCoordinatesAreClockwise(coordinates);
                this.checkLastElement();
            }

            private void checkLastElement()
            {
                //checks if last element is equal to first
                PointD firstPoint = this.Coordinates[0];
                PointD lastPoint = this.Coordinates[this.Coordinates.Count - 1];

                if (firstPoint.X == lastPoint.X && firstPoint.Y == lastPoint.Y)
                {
                    return;
                }
                else
                {
                    this.Coordinates.Add(firstPoint);
                }

            }
            private IList<PointD> checkIfCoordinatesAreClockwise(IList<PointD> coordinates)
            {
                //function checks if coordinates are in clockwise or counterclockwise order. To check that cross product is used.
                //
                double crossPrd;
                var tempCoord = coordinates;
                if (coordinates.Count - 3 < 0)
                    return tempCoord;
                for (int i = 0; i <= coordinates.Count - 3; i++)
                {
                    crossPrd = this.crossProduct(coordinates[i], coordinates[i + 1], coordinates[i + 2]);
                    if (crossPrd > 0)
                    {
                        //clockwise
                        break;
                    }
                    else if (crossPrd < 0)
                    {
                        //counterclockwise
                        tempCoord.Reverse();
                        break;
                    }
                }
                return tempCoord;
            }

            private double crossProduct(PointD p0, PointD p1, PointD p2)
            {
                double[] vector1 = new double[2];
                double[] vector2 = new double[2];

                vector1[0] = p1.X - p0.X;
                vector1[1] = p1.Y - p0.Y;
                vector2[0] = p2.X - p1.X;
                vector2[1] = p2.Y - p1.Y;

                double result; //ax*by-ay*bz
                result = vector1[0] * vector2[1] - vector1[1] * vector2[0];
                return result;
            }
        }
    }
}
