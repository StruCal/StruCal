using Calculators.ConcreteCover;
using NUnit.Framework;

namespace CalculatorsTests.ConcreteCover
{
    [TestFixture]
    public class MinimumCoverDueToEnvironmentalConditionsCalculateTests
    {
        [Test]
        [TestCase(1, ExposureClass.X0, StructuralClass.S1, 0.010d)]
        [TestCase(2, ExposureClass.X0, StructuralClass.S2, 0.010d)]
        [TestCase(3, ExposureClass.X0, StructuralClass.S3, 0.010d)]
        [TestCase(4, ExposureClass.X0, StructuralClass.S4, 0.010d)]
        [TestCase(5, ExposureClass.X0, StructuralClass.S5, 0.015d)]
        [TestCase(6, ExposureClass.X0, StructuralClass.S6, 0.020d)]
        [TestCase(7, ExposureClass.XC1, StructuralClass.S1, 0.010d)]
        [TestCase(8, ExposureClass.XC1, StructuralClass.S2, 0.010d)]
        [TestCase(9, ExposureClass.XC1, StructuralClass.S3, 0.010d)]
        [TestCase(10, ExposureClass.XC1, StructuralClass.S4, 0.015d)]
        [TestCase(11, ExposureClass.XC1, StructuralClass.S5, 0.020d)]
        [TestCase(12, ExposureClass.XC1, StructuralClass.S6, 0.025d)]
        [TestCase(13, ExposureClass.XC2, StructuralClass.S1, 0.010d)]
        [TestCase(14, ExposureClass.XC2, StructuralClass.S2, 0.015d)]
        [TestCase(15, ExposureClass.XC2, StructuralClass.S3, 0.020d)]
        [TestCase(16, ExposureClass.XC3, StructuralClass.S4, 0.025d)]
        [TestCase(17, ExposureClass.XC3, StructuralClass.S5, 0.030d)]
        [TestCase(18, ExposureClass.XC3, StructuralClass.S6, 0.035d)]
        [TestCase(19, ExposureClass.XC4, StructuralClass.S1, 0.015d)]
        [TestCase(20, ExposureClass.XC4, StructuralClass.S2, 0.020d)]
        [TestCase(21, ExposureClass.XC4, StructuralClass.S3, 0.025d)]
        [TestCase(22, ExposureClass.XC4, StructuralClass.S4, 0.030d)]
        [TestCase(23, ExposureClass.XC4, StructuralClass.S5, 0.035d)]
        [TestCase(24, ExposureClass.XC4, StructuralClass.S6, 0.040d)]
        [TestCase(25, ExposureClass.XD1, StructuralClass.S1, 0.020d)]
        [TestCase(26, ExposureClass.XD1, StructuralClass.S2, 0.025d)]
        [TestCase(27, ExposureClass.XD1, StructuralClass.S3, 0.030d)]
        [TestCase(28, ExposureClass.XS1, StructuralClass.S4, 0.035d)]
        [TestCase(29, ExposureClass.XS1, StructuralClass.S5, 0.040d)]
        [TestCase(30, ExposureClass.XS1, StructuralClass.S6, 0.045d)]
        [TestCase(31, ExposureClass.XD2, StructuralClass.S1, 0.025d)]
        [TestCase(32, ExposureClass.XD2, StructuralClass.S2, 0.030d)]
        [TestCase(33, ExposureClass.XD2, StructuralClass.S3, 0.035d)]
        [TestCase(34, ExposureClass.XS2, StructuralClass.S4, 0.040d)]
        [TestCase(35, ExposureClass.XS2, StructuralClass.S5, 0.045d)]
        [TestCase(36, ExposureClass.XS2, StructuralClass.S6, 0.050d)]
        [TestCase(37, ExposureClass.XD3, StructuralClass.S1, 0.030d)]
        [TestCase(38, ExposureClass.XD3, StructuralClass.S2, 0.035d)]
        [TestCase(39, ExposureClass.XD3, StructuralClass.S3, 0.040d)]
        [TestCase(40, ExposureClass.XS3, StructuralClass.S4, 0.045d)]
        [TestCase(41, ExposureClass.XS3, StructuralClass.S5, 0.050d)]
        [TestCase(42, ExposureClass.XS3, StructuralClass.S6, 0.055d)]
        [TestCase(43, ExposureClass.XA1, StructuralClass.S1, 0.000d)]
        [TestCase(44, ExposureClass.XF1, StructuralClass.S1, 0.000d)]
        public void CalculateMinimumCoverDueToEnvironmentalConditionsTests(int testCaseNumber, ExposureClass exposureClass,
            StructuralClass structuralClass, double expectedCover)
        {
            ConcreteCoverInput inputData = new ConcreteCoverInput()
            {
                ExposureClass = ConcreteCoverCalculator.ConvertExposureClassToString(exposureClass),
            };

            ConcreteCoverCalculator coverCalculator = new ConcreteCoverCalculator();
            coverCalculator.outputData.StructuralClass = ConcreteCoverCalculator.ConvertStructuralClassToString(structuralClass);

            var result = coverCalculator.CalculateMinimumCoverDueToEnvironmentalConditions(inputData);
            Assert.AreEqual(expectedCover, result.MinimumCoverDueToEnvironmentalConditions);
        }
    }
}