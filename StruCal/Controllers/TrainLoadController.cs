using Calculators.TrainLoad;
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

namespace StruCal.Controllers
{
    public class TrainLoadController : System.Web.Mvc.Controller
    {
        // GET: TrainLoad
        public System.Web.Mvc.ActionResult Index()
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

        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult TrainLoadCalculations(TrainLoadInputDTO inputDTO)
        {
            var operationGuid = this.dataProvider.StartOperation();
            this.trailLoadProgress.SendProgress(operationGuid, MessageType.ReceivingInputData);

            RedirectToCalculations(inputDTO, operationGuid);
            return Ok(operationGuid);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/TrainLoadApi/{guid}")]
        public IHttpActionResult PerformCalculations([FromBody]TrainLoadInputDTO inputDTO, Guid guid)
        {
            this.trailLoadProgress.SendProgress(guid, MessageType.Calculations);
            var input = inputDTO.ToTrainLoadInput();
            var calculator = new TrainLoadCalculator(input);
            var result = calculator.Calculate();
            var resultZipped = result.ToTrainLoadOutputDTO().Zip();

            this.trailLoadProgress.SendProgress(guid, MessageType.PreparingResult);
            this.dataProvider.SetResult(guid, resultZipped);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("api/TrainLoadApi/Result/{guid}")]
        public IHttpActionResult GetResult(Guid guid)
        {
            var zippedResult = this.dataProvider.GetResult(guid);
            var result = TrainLoadOutputDTO.FromZip(zippedResult);
            this.trailLoadProgress.SendProgress(guid, MessageType.SendingResults);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("api/TrainLoadApi/Progress/{guid}")]
        public IHttpActionResult GetProgress(Guid guid)
        {
            var progress = this.dataProvider.GetProgress(guid);
            var hasResult = this.dataProvider.GetResult(guid) != null;

            return Ok(new { progress, hasResult });
        }

        public void RedirectToCalculations(TrainLoadInputDTO inputDTO, Guid operationGuid)
        {
            var baseUrl = Request.RequestUri.GetLeftPart(UriPartial.Authority);
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            Task.Run(() => client.PostAsJsonAsync($"/api/TrainLoadApi/{operationGuid}", inputDTO));
        }
    }
}