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
        public ActionResult ConcreteCover()
        {
            return View(new ConcreteCoverViewModel());
        }

        [HttpPost]
        public ActionResult ConcreteCover(ConcreteCoverViewModel concreteCoverViewModel)
        {
            if (ModelState.IsValid)
            {
                ConcreteCoverCalculator concreteCoverCalculator = new ConcreteCoverCalculator()
                {
                    RebarDiameter = concreteCoverViewModel.ConvertStringToRebarDiameter(concreteCoverViewModel.SelectedRebarDiameter.Value),
                };
                concreteCoverCalculator.CalculateNominalConcreteCover();
            }

            return View(concreteCoverViewModel);
        }
    }
}