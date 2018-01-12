using StruCal.BindingModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace StruCal.Controllers
{
    public class TrainLoadController : Controller
    {
        // GET: TrainLoad
        public ActionResult Index()
        {
            return View();
        }
    }

    public class TrainLoadApiController : ApiController
    {
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        public IHttpActionResult RcCalculations(TrainLoadBindingModel input)
        {
            
            return Ok("OK");
        }
    }
}