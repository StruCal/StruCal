using StruCal.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StruCal.Controllers
{
    public class ConcreteCoverController : Controller
    {
        [HttpGet]
        public ActionResult ConcreteCover()
        {
            ConcreteCoverViewModel concreteCoverViewModel = new ConcreteCoverViewModel();
            return View(concreteCoverViewModel);
        }

        [HttpPost]
        public ActionResult ConcreteCover(ConcreteCoverViewModel concreteCoverViewModel)
        {
            return View(concreteCoverViewModel);
        }
    }
}