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

            var viewModel = new CustomSectionViewModel()
            {
                Coordinates = "0;10 10;0 20;0 30;10"
            };

            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CustomSection(CustomSectionViewModel viewModel)
        {
            var resultViewModel = this.performCalculations<CustomSectionViewModel>(viewModel);
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
            var resultViewModel = this.performCalculations<RectangularSectionViewModel>(viewModel);
            return View(resultViewModel);
        }

        public ActionResult CircularSection()
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            return View(new CircularSectionViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CircularSection(CircularSectionViewModel viewModel)
        {
            var resultViewModel = this.performCalculations<CircularSectionViewModel>(viewModel);
            return View(resultViewModel);
        }

        public ActionResult TSection()
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            return View(new TSectionViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult TSection(TSectionViewModel viewModel)
        {
            var resultViewModel = this.performCalculations<TSectionViewModel>(viewModel);
            return View(resultViewModel);
        }

        public ActionResult ISection()
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            return View(new ISectionViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ISection(ISectionViewModel viewModel)
        {
            var resultViewModel = this.performCalculations<ISectionViewModel>(viewModel);
            return View(resultViewModel);
        }

        private ISectionPropertiesViewModel performCalculations<T>(ISectionPropertiesViewModel viewModel) where T : ISectionPropertiesViewModel, new()
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
                resultViewModel = resultConverter.PrepareData<T>(calculationResult);
                ViewBag.ShowResults = true;
            }
            else
                ViewBag.InputErrors = true;
            return resultViewModel;
        }
    }
}