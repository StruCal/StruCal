using Calculators.ConcreteCover;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalculatorsTests.ConcreteCover
{
    [TestFixture]
    public class NominalConcreteCoverTests
    {
        [Test]
        [TestCase(1, 0.03d, 0.01d, 0.02d)]
        public void CalculateNominalConcreteCoverTests_(int testCaseNumber, double minimumCover, double allowanceInDesignForDeviation, double expectedCover)
        {
            ConcreteCoverInput inputData = new ConcreteCoverInput()
            {
                ArrangementOfBars = "Separated",
                RebarDiameter = "16 mm",
                ExposureClass = "XC3",
                ConcreteClass = "C30/37",
                BaseStructuralClass = "S4",
                AllowanceInDesignForDeviation = allowanceInDesignForDeviation
            };

            ConcreteCoverCalculator coverCalculator = new ConcreteCoverCalculator();
            coverCalculator.outputData.MinimumCover = minimumCover;

            var result = coverCalculator.CalculateNominalConcreteCover(inputData);
            Assert.AreEqual(expectedCover, result.NominalCover);
        }
    }
}
