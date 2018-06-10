using AutoMapper;
using Calculators.TrainLoad;
using Common.Geometry;
using Common.Utils;
using Database;
using Newtonsoft.Json;
using StruCal.BindingModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
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
        private readonly IDataProvider dataProvider;

        public TrainLoadApiController()
        {
            var connectionString = WebConfigurationManager.ConnectionStrings["MySql"].ConnectionString;
            var sqlProvider = new MySqlProvider(connectionString);
            this.dataProvider = new DataProvider(sqlProvider);
        }

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        public IHttpActionResult TrainLoadCalculations(TrainLoadInputDTO inputDTO)
        {
            var operationGuid = this.dataProvider.StartOperation();

            var progress = new Progress<ProgressMsg>(m => this.dataProvider.SetProgress(operationGuid, m.Progress));

            var input = inputDTO.ToTrainLoadInput();
            var calculator = new TrainLoadCalculator(input, progress);
            var result = calculator.Calculate();
            var resultDTO = result.ToTrainLoadOutputDTO();

            this.dataProvider.SetResult(operationGuid, ZipTools.Compress(JsonConvert.SerializeObject(resultDTO)));

            return Ok(resultDTO);
        }
    }
}