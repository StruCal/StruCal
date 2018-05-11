using Calculators.ConcreteCover;
using NUnit.Framework;

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
            ConcreteCoverInput inputData = new ConcreteCoverInput()
            {
                ArrangementOfBars = ConcreteCoverCalculator.ConvertArrangementOfBarsToString(arrangementOfBars),
                RebarDiameter = (rebarDiameter * 1000).ToString() + " mm",
                NominalMaximumAggregateSizeIsGreaterThan32mm = NominalMaximumAggregateSizeIsGreaterThan32mm
            };

            ConcreteCoverCalculator coverCalculator = new ConcreteCoverCalculator();

            var result = coverCalculator.CalculateMinimumCoverDueToBondRequirement(inputData);
            Assert.AreEqual(expectedCover, result.MinimumCoverDueToBondRequirement);
        }
    }
}