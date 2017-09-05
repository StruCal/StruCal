using FEM2D.Structures;
using FEMCommon.DTO;
using Output.OutputCreator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace StruCal.Controllers
{
    public class MembraneController : Controller
    {
        // GET: Membrane
        public ActionResult Index()
        {
            return View();
        }
    }

    public class MembraneApiController : ApiController
    {
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        public IHttpActionResult RcCalculations(MembraneInputData membraneData)
        {
            var membrane = new Membrane();
            membrane.Solve(membraneData);

            var result = membrane.Results;

            var outputCreator = new OutputCreator(result, membraneData);
            
            if (outputCreator.HasError)
            {
                throw new HttpResponseException(System.Net.HttpStatusCode.InternalServerError);
            }
            else
            {
                outputCreator.CreateOutput();
                return Ok(outputCreator.Output);
            }
        }
    }
}