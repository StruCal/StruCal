using NUnit.Framework;
using Calculators.SectionProperties.Calculations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Geometry;

namespace Calculators.SectionProperties.Calculations.Tests
{
    [TestFixture]
    public class SectionCoordinatesConverterTests
    {
        [Test]
        public void SectionCoordinatesConverter_ConvertingCoordinates_Passed()
        {
            var x = "10.0;20;40.0;80; 90;";
            var y = "12.5;30;50.2;38;-10;";

            var sectionCoordinatesConverter = new SectionCoordinatesConverter();
            var actualResult = sectionCoordinatesConverter.ConvertToSectionCoordinates(x, y);

            var expectedPoints = new List<PointD>();
            expectedPoints.Add(new PointD(10, 12.5));
            expectedPoints.Add(new PointD(20, 30));
            expectedPoints.Add(new PointD(40, 50.2));
            expectedPoints.Add(new PointD(80, 38));
            expectedPoints.Add(new PointD(90, -10));
            expectedPoints.Add(new PointD(10, 12.5)); //first and last point in section cordinates should be the same
            var expectedResult = new SectionCoordinates(expectedPoints);


            CollectionAssert.AreEquivalent(expectedResult.Coordinates, actualResult.Coordinates);
        }
    }
}