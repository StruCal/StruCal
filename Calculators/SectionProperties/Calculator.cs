using Common.Extensions;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.SectionProperties
{
    /// <summary>
    /// class calculates properties of given section
    /// result is given as Dictionary
    /// </summary>
    public class SectionPropertiesCalculator
    {

        double area = 0;
        double firstMomentOfAreaAxisX = 0;
        double firstMomentOfAreaAxisY = 0;
        double secondMomentOfAreaAxisX = 0;
        double secondMomentOfAreaAxisY = 0;
        double momentOfDeviationAxisXY = 0;
        double centreOfGravityX = 0;
        double centreOfGravityY = 0;
        double secondMomentOfAreaCentalAxisX = 0;
        double secondMomentOfAreaCentralAxisY = 0;
        double momentOfDeviationCentralAxisXY = 0;
        double firstPrincipalSecondMomentOfArea = 0;
        double secondPrincipalSecondMomentOfArea = 0;
        double substituteRectangleHeight = 0;
        double substituteRectangleWidth = 0;
        double alfa = 0;
        //extreme distances
        double x0_max, x0_min, y0_max, y0_min;
        double xI_max, xI_min, yI_max, yI_min;

        public SectionPropertiesCalculator()
        {
        }

        public IEnumerable<SectionPropertiesResult> CalculateProperties(string x, string y)
        {
            var converter = new SectionCoordinatesConverter();
            var sectionCoordinates = converter.ConvertToSectionCoordinates(x, y);

            return this.CalculateProperties(sectionCoordinates);
        }

        public IEnumerable<SectionPropertiesResult> CalculateProperties(SectionCoordinates coordinats)
        {
            var perimeter = new List<SectionCoordinates>();
            perimeter.Add(coordinats);

            var sectionData = new SectionData
            {
                OuterPerimeters = perimeter
            };

            return this.CalculateProperties(sectionData);
        }

        public IEnumerable<SectionPropertiesResult> CalculateProperties(SectionData section)
        {
            calculateBaseProperties(section.OuterPerimeters, PerimeterType.Outer);
            if (section.InnerPerimeters != null)
                calculateBaseProperties(section.InnerPerimeters, PerimeterType.Inner);
            applyFactorsToCalculatedProperties();
            calculateCentreOfGravity();
            calculatePropertiesInCentreOfGravity();
            calculatePrincipalMoments();
            calculateSubstituteRectangle();
            calculateAngleOfPrincipalAxes();
            calculateExtremeDistances(section);

            var results = prepareResults();
            return results;
        }

        private IEnumerable<SectionPropertiesResult> prepareResults()
        {
            var results = new List<SectionPropertiesResult>();
            results.Add(new SectionPropertiesResult { Property = SectionProperty.alfa, Value = alfa });
            //results.Add(new SectionPropertiesResult { PropertyName = SectionProperty.b, PropertyValue = substituteRectangleWidth });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.F, Value = area });
            //results.Add(new SectionPropertiesResult { PropertyName = SectionProperty.h, PropertyValue = substituteRectangleHeight });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.I1, Value = firstPrincipalSecondMomentOfArea });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.I2, Value = secondPrincipalSecondMomentOfArea });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.Ix, Value = secondMomentOfAreaAxisX });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.Ix0, Value = secondMomentOfAreaCentalAxisX });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.Ixy, Value = momentOfDeviationAxisXY });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.Ixy0, Value = momentOfDeviationCentralAxisXY });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.Iy, Value = secondMomentOfAreaAxisY });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.Iy0, Value = secondMomentOfAreaCentralAxisY });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.Sx, Value = firstMomentOfAreaAxisX });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.Sy, Value = firstMomentOfAreaAxisY });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.x0_max, Value = x0_max });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.x0_min, Value = x0_min });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.xI_max, Value = xI_max });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.xI_min, Value = xI_min });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.x0, Value = centreOfGravityX });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.y0, Value = centreOfGravityY });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.y0_max, Value = y0_max });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.y0_min, Value = y0_min });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.yI_max, Value = yI_max });
            results.Add(new SectionPropertiesResult { Property = SectionProperty.yI_min, Value = yI_min });
            return results;
        }

        private void calculateExtremeDistances(SectionData section)
        {
            var extremedistances = new ExtremeDistances(new PointD(centreOfGravityX, centreOfGravityY));

            extremedistances.maxDistancesCentralCoordinateSystem(section.OuterPerimeters, out x0_max, out x0_min, out y0_max, out y0_min);
            extremedistances.maxDistancesPrincipalCoordinateSystem(section.OuterPerimeters, alfa, out xI_max, out xI_min, out yI_max, out yI_min);
        }

        private void calculateAngleOfPrincipalAxes()
        {
            alfa = Math.Atan(momentOfDeviationCentralAxisXY / (secondMomentOfAreaCentralAxisY - firstPrincipalSecondMomentOfArea));
            if (double.IsNaN(alfa))
                alfa = Math.PI / 2;
            if (momentOfDeviationCentralAxisXY.IsApproximatelyEqualTo(0d))
                alfa = 0;
        }

        private void calculateSubstituteRectangle()
        {
            substituteRectangleHeight = Math.Sqrt(12 * secondMomentOfAreaCentalAxisX / area);
            substituteRectangleWidth = area / substituteRectangleHeight;
        }

        private void calculatePrincipalMoments()
        {
            firstPrincipalSecondMomentOfArea = (secondMomentOfAreaCentalAxisX + secondMomentOfAreaCentralAxisY) / 2 + 0.5 * Math.Sqrt(Math.Pow(secondMomentOfAreaCentralAxisY - secondMomentOfAreaCentalAxisX, 2) + 4 * momentOfDeviationCentralAxisXY * momentOfDeviationCentralAxisXY);
            secondPrincipalSecondMomentOfArea = (secondMomentOfAreaCentalAxisX + secondMomentOfAreaCentralAxisY) / 2 - 0.5 * Math.Sqrt(Math.Pow(secondMomentOfAreaCentralAxisY - secondMomentOfAreaCentalAxisX, 2) + 4 * momentOfDeviationCentralAxisXY * momentOfDeviationCentralAxisXY);
        }

        private void calculatePropertiesInCentreOfGravity()
        {
            secondMomentOfAreaCentalAxisX = secondMomentOfAreaAxisX - area * centreOfGravityY * centreOfGravityY;
            secondMomentOfAreaCentralAxisY = secondMomentOfAreaAxisY - area * centreOfGravityX * centreOfGravityX;
            momentOfDeviationCentralAxisXY = momentOfDeviationAxisXY - area * centreOfGravityX * centreOfGravityY;
        }

        private void calculateCentreOfGravity()
        {
            centreOfGravityX = firstMomentOfAreaAxisY / area;
            centreOfGravityY = firstMomentOfAreaAxisX / area;
        }

        private void applyFactorsToCalculatedProperties()
        {
            area = area / 2;
            firstMomentOfAreaAxisX = firstMomentOfAreaAxisX / 6;
            firstMomentOfAreaAxisY = firstMomentOfAreaAxisY / 6;
            secondMomentOfAreaAxisX = secondMomentOfAreaAxisX / 12;
            secondMomentOfAreaAxisY = secondMomentOfAreaAxisY / 12;
            momentOfDeviationAxisXY = momentOfDeviationAxisXY / 24;
        }

        private void calculateBaseProperties(IEnumerable<SectionCoordinates> perimeters, PerimeterType perimeterType)
        {
            //determines if values should be added or subtracked.
            var multiplier = perimeterType == PerimeterType.Outer ? 1 : -1;

            foreach (var perimeter in perimeters)
            {
                for (int i = 0; i <= perimeter.Coordinates.Count - 2; i++)
                {
                    double x1, x2, y1, y2;
                    x1 = perimeter.Coordinates[i].X;
                    x2 = perimeter.Coordinates[i + 1].X;
                    y1 = perimeter.Coordinates[i].Y;
                    y2 = perimeter.Coordinates[i + 1].Y;
                    area = area + (x1 - x2) * (y2 + y1);
                    firstMomentOfAreaAxisX = firstMomentOfAreaAxisX + ((x1 - x2) * (y1 * y1 + y1 * y2 + y2 * y2)) * multiplier;
                    firstMomentOfAreaAxisY = firstMomentOfAreaAxisY + ((y2 - y1) * (x1 * x1 + x1 * x2 + x2 * x2)) * multiplier;
                    secondMomentOfAreaAxisX = secondMomentOfAreaAxisX + ((x1 - x2) * (y1 * y1 * y1 + y1 * y1 * y2 + y1 * y2 * y2 + y2 * y2 * y2)) * multiplier;
                    secondMomentOfAreaAxisY = secondMomentOfAreaAxisY + ((y2 - y1) * (x1 * x1 * x1 + x1 * x1 * x2 + x1 * x2 * x2 + x2 * x2 * x2)) * multiplier;
                    momentOfDeviationAxisXY = momentOfDeviationAxisXY + ((x1 - x2) * (x1 * (3 * y1 * y1 + y2 * y2 + 2 * y1 * y2) + x2 * (3 * y2 * y2 + y1 * y1 + 2 * y1 * y2))) * multiplier;
                }
            }
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
        public void maxDistancesCentralCoordinateSystem(IEnumerable<SectionCoordinates> sections, out double x0_max, out double x0_min, out double y0_max, out double y0_min)
        {
            //Tuple=> x0_max,x0_min,y0_max,y0_min
            x0_max = sections.Max(section => section.Coordinates.Max(point => point.X)) - this.centreOfGravity.X;
            x0_min = sections.Min(section => section.Coordinates.Min(point => point.X)) - this.centreOfGravity.X;
            y0_max = sections.Max(section => section.Coordinates.Max(point => point.Y)) - this.centreOfGravity.Y;
            y0_min = sections.Min(section => section.Coordinates.Min(point => point.Y)) - this.centreOfGravity.Y;

        }
        public void maxDistancesPrincipalCoordinateSystem(IEnumerable<SectionCoordinates> sections, double alfa, out double x_max, out double x_min, out double y_max, out double y_min)
        {
            double cos = Math.Cos(alfa);
            double sin = Math.Sin(alfa);

            //coordinate of the centre of gravity in rotated coordinate system
            double xo = this.centreOfGravity.X * cos - this.centreOfGravity.Y * sin;
            double yo = this.centreOfGravity.X * sin + this.centreOfGravity.Y * cos;

            x_max = sections.Max(section => section.Coordinates.Max(point => point.X * cos - point.Y * sin)) - xo;
            x_min = sections.Min(section => section.Coordinates.Min(point => point.X * cos - point.Y * sin)) - xo;
            y_max = sections.Max(section => section.Coordinates.Max(point => point.X * sin + point.Y * cos)) - yo;
            y_min = sections.Min(section => section.Coordinates.Min(point => point.X * sin + point.Y * cos)) - yo;
        }

    }
    public enum SectionProperty
    {
        F,
        Sx,
        Sy,
        Ix,
        Iy,
        Ixy,

        x0,
        y0,
        Ix0,
        Iy0,
        Ixy0,
        x0_max,
        x0_min,
        y0_max,
        y0_min,

        I1,
        I2,
        alfa,
        xI_max,
        xI_min,
        yI_max,
        yI_min,

        //b,
        //h
    };
    public class SectionPropertiesResult
    {
        public SectionProperty Property { get; set; }
        public double Value { get; set; }
    }

    enum PerimeterType
    {
        Outer,
        Inner
    }

    public class SectionData
    {
        public IEnumerable<SectionCoordinates> OuterPerimeters { get; set; }
        public IEnumerable<SectionCoordinates> InnerPerimeters { get; set; }
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
                    tempCoord = tempCoord.Reverse().ToList();
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

    /// <summary>
    /// Converts the coordinates given as a string (e.g "10;30.5;80.8;60.2) to numbers
    /// and returns collection of SectionCoordinates
    /// </summary>
    public class SectionCoordinatesConverter
    {
        private const char separator = ';';

        public SectionCoordinates ConvertToSectionCoordinates(string xCoordinates, string yCoordinates)
        {
            var x = xCoordinates.Split(new char[] { separator }, StringSplitOptions.RemoveEmptyEntries);
            var y = yCoordinates.Split(new char[] { separator }, StringSplitOptions.RemoveEmptyEntries);

            var coordinates = convertCoordinates(x, y);

            var sectionCoordinates = new SectionCoordinates(coordinates);
            return sectionCoordinates;
        }

        private static List<PointD> convertCoordinates(string[] x, string[] y)
        {
            var coordinates = new List<PointD>();

            for (int i = 0; i < x.Length; i++)
            {
                var xTemp = double.Parse(x[i].Trim(), CultureInfo.InvariantCulture);
                var yTemp = double.Parse(y[i].Trim(), CultureInfo.InvariantCulture);

                var point = new PointD(xTemp, yTemp);

                coordinates.Add(point);
            }
            return coordinates;
        }
    }
}

