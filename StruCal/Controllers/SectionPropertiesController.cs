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
            return View(new SectionPropertiesViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CustomSection(SectionPropertiesViewModel viewModel)
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            var resultViewModel = viewModel;
            if (ModelState.IsValid)
            {
                var propertiesCalculator = new SectionPropertiesCalculator();
                var calculationResult = propertiesCalculator.CalculateProperties(viewModel.XCoordinates, viewModel.YCoordinates);

                var resultConverter = new SectionPropertiesOutputDataConverter();
                resultViewModel = resultConverter.PrepareData(calculationResult);
                ViewBag.ShowResults = true;
            }
            else
                ViewBag.InputErrors = true;
            return View(resultViewModel);
        }
    }
}