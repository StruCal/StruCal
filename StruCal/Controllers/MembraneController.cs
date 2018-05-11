using FEM2D.Structures;
using FEM2DCommon.DTO;
using Output.OutputCreator;
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
            var membrane = new Structure();
            membrane.AddMembraneGeometry(membraneData);
            membrane.Solve();

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