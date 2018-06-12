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
            var baseUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            RedirectToCalculations(inputDTO, baseUrl, operationGuid);
            return Ok(operationGuid);
        }

        [System.Web.Http.AllowAnonymous]
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/TrainLoadApi/{guid}")]
        public IHttpActionResult PerformCalculations([FromBody]TrainLoadInputDTO inputDTO, Guid guid)
        {
            Action<ProgressMsg> progress = m => this.dataProvider.SetProgress(guid, m.Progress);

            var input = inputDTO.ToTrainLoadInput();
            var calculator = new TrainLoadCalculator(input, progress);
            var result = calculator.Calculate();
            var resultDTO = result.ToTrainLoadOutputDTO();

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