using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using Calculators.SectionProperties;
using Common.Extensions;
using System.Text.RegularExpressions;
using StruCal.ViewModels;

namespace StruCal.Controllers
{
    

    public class SectionPropertiesController : Controller
    {
        // GET: SectionProperties
        public ActionResult CustomSection()
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            return View(new CustomSectionViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CustomSection(CustomSectionViewModel viewModel)
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            var resultViewModel = viewModel;
            if (ModelState.IsValid)
            {
                var propertiesCalculator = new SectionPropertiesCalculator();

                var x = viewModel.GetXCoordinates();
                var y = viewModel.GetYCoordinates();

                var calculationResult = propertiesCalculator.CalculateProperties(x, y);

                var resultConverter = new SectionPropertiesOutputDataConverter();
                resultViewModel = resultConverter.PrepareData(calculationResult);
                ViewBag.ShowResults = true;
            }
            else
                ViewBag.InputErrors = true;
            return View(resultViewModel);
        }

        public ActionResult RectangularSection()
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            return View(new RectangularSectionViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RectangularSection(RectangularSectionViewModel viewModel)
        {

            return View();
        }

        
    }
}