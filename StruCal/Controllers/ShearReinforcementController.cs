using Calculators.ShearReinforcement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace StruCal.Controllers
{
    public class ShearReinforcementController : Controller
    {
        // GET: ShearReinforcement
        public ActionResult ShearReinforcement()
        {
            return View();
        }
    }

    public class ShearReinforcementApiController : ApiController
    {
        [System.Web.Http.HttpPost]
        public ShearReinforcementOutput Test(ShearReinforcementInput input)
        {
            var result = new ShearReinforcementOutput
            {
                Crdc = 1d,
                fcd = 20000d,
                k1 = 3000d
            };
            return result;
        }
    }
}