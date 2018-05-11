using Calculators.SectionProperties;
using StruCal.ViewModels;
using System.Web.Mvc;

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
            ViewBag.HasResult = false;
            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CustomSection(CustomSectionViewModel viewModel)
        {
            var resultViewModel = this.performCalculations<CustomSectionViewModel>(viewModel);
            ViewBag.HasResult = true;
            return View(resultViewModel);
        }

        public ActionResult RectangularSection()
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            var viewModel = new RectangularSectionViewModel
            {
                Height = "10",
                Width = "4"
            };
            ViewBag.HasResult = false;
            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RectangularSection(RectangularSectionViewModel viewModel)
        {
            var resultViewModel = this.performCalculations<RectangularSectionViewModel>(viewModel);
            ViewBag.HasResult = true;
            return View(resultViewModel);
        }

        public ActionResult CircularSection()
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            var viewModel = new CircularSectionViewModel
            {
                Radious = "10"
            };
            ViewBag.HasResult = false;
            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CircularSection(CircularSectionViewModel viewModel)
        {
            var resultViewModel = this.performCalculations<CircularSectionViewModel>(viewModel);
            ViewBag.HasResult = true;
            return View(resultViewModel);
        }

        public ActionResult TSection()
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            var viewModel = new TSectionViewModel
            {
                WebThickness = "0.2",
                FlangeThickness = "0.2",
                FlangeWidth = "1",
                Height = "2"
            };
            ViewBag.HasResult = false;
            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult TSection(TSectionViewModel viewModel)
        {
            var resultViewModel = this.performCalculations<TSectionViewModel>(viewModel);
            ViewBag.HasResult = true;
            return View(resultViewModel);
        }

        public ActionResult ISection()
        {
            ViewBag.ShowResults = false;
            ViewBag.InputErrors = false;
            var viewModel = new ISectionViewModel
            {
                WebThickness = "0.2",
                TopFlangeThickness = "0.2",
                TopFlangeWidth = "1",
                Height = "2",
                BottomFlangeThickness = "0.1",
                BottomFlangeWidth = "0.5",
            };
            ViewBag.HasResult = false;
            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ISection(ISectionViewModel viewModel)
        {
            var resultViewModel = this.performCalculations<ISectionViewModel>(viewModel);
            ViewBag.HasResult = true;
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