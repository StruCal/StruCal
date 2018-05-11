using Calculators.ConcreteCover;
using NUnit.Framework;

namespace CalculatorsTests.ConcreteCover
{
    [TestFixture]
    public class StructuralClassTests
    {
        //TODO - sprawdzić co w sytuacji, gdy wyjściowa klasa S6 i mamy +2 i -1, czy w sumie mamy S6 czy S5?
        //TODO - dodać validację tych otulin, żeby np. nie można było mieć ujemnej
        //TODO - dodać defaultowe wartości poszczególnych parametrów
        //TODO - dodać testy integracyjne dla NominalCover
        //TODO - poprawić nazwy testów na zgodne z konwencją
        //TODO - CalculateMinimumCoverTests
        [Test]
        [TestCase("1", StructuralClass.S1, true, ExposureClass.X0, ConcreteClass.C12_15, true, true, "S1")]
        [TestCase("2", StructuralClass.S2, true, ExposureClass.XA1, ConcreteClass.C16_20, true, false, "S2")]
        [TestCase("3", StructuralClass.S3, true, ExposureClass.XC1, ConcreteClass.C20_25, false, true, "S4")]
        [TestCase("4", StructuralClass.S4, true, ExposureClass.XD1, ConcreteClass.C25_30, false, false, "S6")]
        [TestCase("5", StructuralClass.S5, true, ExposureClass.XF1, ConcreteClass.C30_37, true, true, "S5")]
        [TestCase("6", StructuralClass.S6, true, ExposureClass.XS1, ConcreteClass.C35_45, true, false, "S6")]
        [TestCase("7", StructuralClass.S1, false, ExposureClass.XS3, ConcreteClass.C40_50, false, true, "S1")]
        [TestCase("8", StructuralClass.S2, false, ExposureClass.XF4, ConcreteClass.C45_55, false, false, "S2")]
        [TestCase("9", StructuralClass.S3, false, ExposureClass.XD3, ConcreteClass.C50_60, true, true, "S1")]
        [TestCase("10", StructuralClass.S4, false, ExposureClass.XA3, ConcreteClass.C70_80, false, true, "S4")]
        [TestCase("11", StructuralClass.S5, false, ExposureClass.X0, ConcreteClass.C80_95, false, false, "S4")]
        [TestCase("12", StructuralClass.S6, false, ExposureClass.X0, ConcreteClass.C90_105, false, false, "S5")]
        [TestCase("Designers' guide to Eurocode 2: Design of concrete structures. Part 2: Concrete bridges", StructuralClass.S4, true, ExposureClass.XC3, ConcreteClass.C40_50, true, false, "S4")]
        public void CalculateStructuralClass(string testCaseNumber, StructuralClass structureClass,
            bool designWorkingLifeOf100Years, ExposureClass exposureClass, ConcreteClass concreteClass,
            bool memberWithSlabGeometry, bool specialQualityControlOfTheConcreteProductionEnsured,
            string expectedStructuralClass)
        {
            ConcreteCoverInput inputData = new ConcreteCoverInput()
            {
                // Recommended Structural Class when design working life is 50 years
                BaseStructuralClass = ConcreteCoverCalculator.ConvertStructuralClassToString(structureClass),
                DesignWorkingLifeOf100Years = designWorkingLifeOf100Years,
                ExposureClass = ConcreteCoverCalculator.ConvertExposureClassToString(exposureClass),
                ConcreteClass = ConcreteCoverCalculator.ConvertConcreteClassToString(concreteClass),
                MemberWithSlabGeometry = memberWithSlabGeometry,
                SpecialQualityControlOfTheConcreteProductionEnsured = specialQualityControlOfTheConcreteProductionEnsured
            };

            ConcreteCoverCalculator coverCalculator = new ConcreteCoverCalculator();

            var result = coverCalculator.CalculateStructuralClass(inputData);
            Assert.AreEqual(expectedStructuralClass, "S" + result.StructuralClass);
        }
    }
}