using Calculators.RCBeam;
using Common.Geometry;
using StruCal.BindingModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace StruCal.Controllers
{
    public class RCBeamController : Controller
    {
        // GET: RCBeam
        public ActionResult Index()
        {
            return View();
        }
    }

    public class RCBeamApiController : ApiController
    {
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        public IHttpActionResult RcCalculations(RcBeamInput input)
        {
            var result = RcBeamCalculator.GetSectionCapacity(input.Concrete, input.Steel, input.SectionCoordinates, input.Bars, input.LoadCases);
            var s = input;
            return Ok("dziala");
        }
    }
    
}