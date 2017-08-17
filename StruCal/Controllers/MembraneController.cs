using FEMCommon.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public IHttpActionResult RcCalculations(MembraneInputData input)
        {
            
            return Ok();
        }
    }
}