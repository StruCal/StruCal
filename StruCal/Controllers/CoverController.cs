using Calculators.ConcreteCover;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace StruCal.Controllers
{
    public class CoverController : Controller
    {
        // GET: Cover
        public ActionResult Cover()
        {
            return View();
        }
    }

    public class CoverApiController : ApiController
    {
        [System.Web.Http.HttpPost]
        public ConcreteCoverOutputString GetResults(ConcreteCoverInput input)
        {
            var calculator = new ConcreteCoverCalculator();
            var output = calculator.CalculateNominalConcreteCover(input);
        
            return new ConcreteCoverOutputString {
                StructuralClass = "S" + output.StructuralClass.ToString(),
                MinimumCover = (output.MinimumCover * 1000).ToString() + " mm",
                MinimumCoverDueToBondRequirement = (output.MinimumCoverDueToBondRequirement * 1000).ToString() + " mm",
                MinimumCoverDueToEnvironmentalConditions = (output.MinimumCoverDueToEnvironmentalConditions * 1000).ToString() + " mm",
                NominalCover = (output.NominalCover * 1000).ToString() + " mm"
            };
        }
    }

    public class ConcreteCoverOutputString
    {
        public string StructuralClass { get; set; }
        public string MinimumCoverDueToBondRequirement { get; set; }
        public string MinimumCoverDueToEnvironmentalConditions { get; set; }
        public string MinimumCover { get; set; }
        public string NominalCover { get; set; }
    }
}