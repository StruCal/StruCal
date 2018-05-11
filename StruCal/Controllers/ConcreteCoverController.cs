using Calculators.ConcreteCover;
using StruCal.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StruCal.Controllers
{
    public class ConcreteCoverController : Controller
    {
        public ActionResult Index()
        {
            ConcreteCoverViewModel viewModel = new ConcreteCoverViewModel()
            {
                IsCalculated = false,
                AllowanceInDesignForDeviation = 0.01d * 1000d,
                StructuralClass = "S4",
            };

            return View(viewModel);
        }

        [HttpPost]
        public ActionResult Index(ConcreteCoverViewModel viewModel)
        {
            //if (ModelState.IsValid)
            //{
            ConcreteCoverCalculator concreteCoverCalculator = new ConcreteCoverCalculator()
            {
                RebarDiameter = viewModel.ConvertStringToRebarDiameter(viewModel.SelectedRebarDiameter),
                ArrangementOfBars = viewModel.ConvertStringToArrangementOfBars(viewModel.SelectedArrangementOfBars),
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
            //}

            viewModel.StructuralClass = concreteCoverCalculator.StructuralClass.ToString();
            viewModel.MinimumCoverDueToBondRequirement = concreteCoverCalculator.MinimumCoverDueToBondRequirement * 1000d;
            viewModel.MinimumCoverDueToEnvironmentalConditions = concreteCoverCalculator.MinimumCoverDueToEnvironmentalConditions * 1000d;
            viewModel.MinimumCover = concreteCoverCalculator.MinimumCover * 1000d;
            viewModel.NominalCover = concreteCoverCalculator.NominalCover * 1000d;

            viewModel.IsCalculated = true;

            return View(viewModel);
        }
    }
}