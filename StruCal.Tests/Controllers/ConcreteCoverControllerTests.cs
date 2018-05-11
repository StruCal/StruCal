using Calculators.ConcreteCover;
using NUnit.Framework;
using StruCal.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.Tests.Controllers
{
    [TestFixture]
    public class ConcreteCoverControllerTests
    {
        [TestCase("Designers' guide to Eurocode 2: Design of concrete structures. Part 2: Concrete bridges", "20", "Separated", "C40/50", "XC3", "S4", false, true, true, false, 0.0d, 0.0d, 0.0d, 10d, "S4", 20, 25, 25, 35)]
        public void ConcreteCoverController_ViewModel_ReturnProperValues(string testCaseName, string selectedRebarDiameter, string selectedArrangementOfBars, string selectedConcreteClass,
            string selectedExposureClass, string selectedBaseStructuralClass, bool nominalMaximumAggregateSizeIsGreaterThan32mm, bool designWorkingLifeOf100Years,
            bool memberWithSlabGeometry, bool specialQualityControlOfTheConcreteProductionEnsured, double additiveSafetyElement, double reductionOfMinimumCoverForUseOfAdditionalProtection,
            double reductionOfMinimumCoverForUseOfStainlessSteel, double allowanceInDesignForDeviation,
            string expectedStructuralClass, double expectedMinimumCoverDueToBondRequirement, double expectedMinimumCoverDueToEnvironmentalConditions, double expectedMinimumCover, double expectedNominalCover)
        {
            var viewModel = new ConcreteCoverViewModel();
            viewModel.SelectedRebarDiameter = selectedRebarDiameter;
            //viewModel.SelectedArrangementOfBars = selectedArrangementOfBars;
            viewModel.SelectedConcreteClass = selectedConcreteClass;
            viewModel.SelectedExposureClass = selectedExposureClass;
            viewModel.SelectedBaseStructuralClass = selectedBaseStructuralClass;
            viewModel.NominalMaximumAggregateSizeIsGreaterThan32mm = nominalMaximumAggregateSizeIsGreaterThan32mm;
            viewModel.DesignWorkingLifeOf100Years = designWorkingLifeOf100Years;
            viewModel.MemberWithSlabGeometry = memberWithSlabGeometry;
            viewModel.SpecialQualityControlOfTheConcreteProductionEnsured = specialQualityControlOfTheConcreteProductionEnsured;
            viewModel.AdditiveSafetyElement = additiveSafetyElement;
            viewModel.ReductionOfMinimumCoverForUseOfAdditionalProtection = reductionOfMinimumCoverForUseOfAdditionalProtection;
            viewModel.ReductionOfMinimumCoverForUseOfStainlessSteel = reductionOfMinimumCoverForUseOfStainlessSteel;
            viewModel.AllowanceInDesignForDeviation = allowanceInDesignForDeviation;

            ConcreteCoverCalculator concreteCoverCalculator = new ConcreteCoverCalculator()
            {
                RebarDiameter = viewModel.ConvertStringToRebarDiameter(viewModel.SelectedRebarDiameter),
                //ArrangementOfBars = viewModel.ConvertStringToArrangementOfBars(viewModel.SelectedArrangementOfBars),
                ConcreteClass = viewModel.ConvertStringToConcreteClass(viewModel.SelectedConcreteClass),
                ExposureClass = viewModel.ConvertStringToExposureClass(viewModel.SelectedExposureClass),
                BaseStructuralClass = viewModel.ConvertStringToStructuralClass(viewModel.SelectedBaseStructuralClass),
                NominalMaximumAggregateSizeIsGreaterThan32mm = viewModel.NominalMaximumAggregateSizeIsGreaterThan32mm,
                DesignWorkingLifeOf100Years = viewModel.DesignWorkingLifeOf100Years,
                MemberWithSlabGeometry = viewModel.MemberWithSlabGeometry,
                SpecialQualityControlOfTheConcreteProductionEnsured = viewModel.SpecialQualityControlOfTheConcreteProductionEnsured,
                AdditiveSafetyElement = viewModel.AdditiveSafetyElement / 1000d,
                ReductionOfMinimumCoverForUseOfAdditionalProtection = viewModel.ReductionOfMinimumCoverForUseOfAdditionalProtection / 1000d,
                ReductionOfMinimumCoverForUseOfStainlessSteel = viewModel.ReductionOfMinimumCoverForUseOfStainlessSteel / 1000d,
                AllowanceInDesignForDeviation = viewModel.AllowanceInDesignForDeviation / 1000d
            };
            concreteCoverCalculator.CalculateNominalConcreteCover();

            viewModel.StructuralClass = concreteCoverCalculator.StructuralClass.ToString();
            viewModel.MinimumCoverDueToBondRequirement = concreteCoverCalculator.MinimumCoverDueToBondRequirement * 1000d;
            viewModel.MinimumCoverDueToEnvironmentalConditions = concreteCoverCalculator.MinimumCoverDueToEnvironmentalConditions * 1000d;
            viewModel.MinimumCover = concreteCoverCalculator.MinimumCover * 1000d;
            viewModel.NominalCover = concreteCoverCalculator.NominalCover * 1000d;

            Assert.AreEqual(expectedStructuralClass, viewModel.StructuralClass);
            Assert.AreEqual(expectedMinimumCoverDueToBondRequirement, viewModel.MinimumCoverDueToBondRequirement);
            Assert.AreEqual(expectedMinimumCoverDueToEnvironmentalConditions, viewModel.MinimumCoverDueToEnvironmentalConditions);
            Assert.AreEqual(expectedMinimumCover, viewModel.MinimumCover);
            Assert.AreEqual(expectedNominalCover, viewModel.NominalCover);
        }
    }
}