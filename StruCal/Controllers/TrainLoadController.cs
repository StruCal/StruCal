using AutoMapper;
using Calculators.TrainLoad;
using Common.Geometry;
using StruCal.BindingModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
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

    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class TrainLoadApiController : ApiController
    {
        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        public IHttpActionResult TrainLoadCalculations(TrainLoadInput input)
        {
            var calculator = new TrainLoadCalculator(input);
            var result = calculator.Calculate();
            var resultDTO = result.ToTrainLoadOutputDTO();
            //change section properties


            return Ok(resultDTO);
        }


    }
}