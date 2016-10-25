using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using Calculators.SectionProperties.SectionProperties.Calculations;
using Common.Extensions;
using System.Text.RegularExpressions;
using StruCal.ViewModels;

namespace StruCal.Controllers
{
    

    public class SectionPropertiesController : Controller
    {
        // GET: SectionProperties
        public ActionResult Index()
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            return View(new SectionPropertiesViewModel());
        }

        [HttpPost]
        public ActionResult Index(SectionPropertiesViewModel viewModel)
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            if (ModelState.IsValid)
            {
                var propertiesCalculator = new SectionPropertiesCalculator();
                var calculationResult = propertiesCalculator.CalculateProperties(viewModel.XCoordinates, viewModel.YCoordinates);

                var sectionProperties = new List<SectionPropertyViewData>();

                //TODO: Should be moved to separate metod for 
                foreach (var item in calculationResult)
                {
                    sectionProperties.Add(new SectionPropertyViewData
                    {
                        Name = item.Key.ToString(),
                        Value = String.Format("{0,5:0.00}", item.Value)//item.Value.ToString()
                    });
                }
                viewModel.SectionProperties = sectionProperties;
                ViewBag.ShowResults = true;
            }
            else
                ViewBag.InputErrors = true;
            return View(viewModel);
        }
    }
}