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
    public class MinimumCoverDueToBondRequirementTests
    {
        [Test]
        [TestCase(1, ArrangementOfBars.Separated, 0.01d, false, 0.01d)]
        [TestCase(2, ArrangementOfBars.Separated, 0.015d, true, 0.02d)]
        [TestCase(3, ArrangementOfBars.Bundled, 0.03d, false, 0.03d)]
        [TestCase(4, ArrangementOfBars.Bundled, 0.04d, true, 0.045d)]
        public void CalculateMinimumCoverDueToBondRequirementTests(int testCaseNumber, ArrangementOfBars arrangementOfBars,
            double rebarDiameter, bool NominalMaximumAggregateSizeIsGreaterThan32mm, double expectedCover)
        {
            Calculator coverCalculator = new Calculator()
            {
                ArrangementOfBars = arrangementOfBars,
                RebarDiameter = rebarDiameter,
                NominalMaximumAggregateSizeIsGreaterThan32mm = NominalMaximumAggregateSizeIsGreaterThan32mm
            };

            coverCalculator.CalculateMinimumCoverDueToBondRequirement();
            Assert.AreEqual(expectedCover, coverCalculator.MinimumCoverDueToBondRequirement);
        }
    }
}
