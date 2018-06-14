using AutoMapper;
using Calculators.TrainLoad;
using Common.Geometry;
using Common.Utils;
using Database;
using Newtonsoft.Json;
using StruCal.BindingModels;
using StruCal.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
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
        private readonly TrailLoadProgress trailLoadProgress;

        public TrainLoadApiController()
        {
            var connectionString = WebConfigurationManager.ConnectionStrings["MySql"].ConnectionString;
            var sqlProvider = new MySqlProvider(connectionString);
            this.dataProvider = new DataProvider(sqlProvider);
            this.trailLoadProgress = new TrailLoadProgress(dataProvider);
        }

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        public IHttpActionResult TrainLoadCalculations(TrainLoadInputDTO inputDTO)
        {
            var operationGuid = this.dataProvider.StartOperation();
            this.trailLoadProgress.SendProgress(operationGuid, MessageType.ReceivingInputData);
            var baseUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            RedirectToCalculations(inputDTO, baseUrl, operationGuid);
            return Ok(operationGuid);
        }

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/TrainLoadApi/{guid}")]
        public IHttpActionResult PerformCalculations([FromBody]TrainLoadInputDTO inputDTO, Guid guid)
        {
            this.trailLoadProgress.SendProgress(guid, MessageType.Calculations);
            var input = inputDTO.ToTrainLoadInput();
            var calculator = new TrainLoadCalculator(input);
            var result = calculator.Calculate();
            var resultDTO = result.ToTrainLoadOutputDTO();

            this.trailLoadProgress.SendProgress(guid, MessageType.PreparingResult);
            this.dataProvider.SetResult(guid, ZipTools.Compress(JsonConvert.SerializeObject(resultDTO)));

            return Ok(resultDTO);
        }

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/TrainLoadApi/Result/{guid}")]
        public IHttpActionResult GetResult(Guid guid)
        {
            var resultData = this.dataProvider.GetResult(guid);
            var result = JsonConvert.DeserializeObject<TrainLoadOutputDTO>(ZipTools.DecompressToString(resultData));
            this.trailLoadProgress.SendProgress(guid, MessageType.SendingResults);
            return Ok(result);
        }

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/TrainLoadApi/Progress/{guid}")]
        public IHttpActionResult GetProgress(Guid guid)
        {
            var progress = this.dataProvider.GetProgress(guid);
            var hasResult = this.dataProvider.GetResult(guid) != null;

            return Ok(new { progress, hasResult });
        }

        public static void RedirectToCalculations(TrainLoadInputDTO inputDTO, string baseUrl, Guid guid)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            Task.Run(() => client.PostAsJsonAsync($"/api/TrainLoadApi/{guid}", inputDTO));
        }
    }
}