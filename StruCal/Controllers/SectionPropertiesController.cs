using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;

namespace StruCal.Controllers
{
    public class SectionPropertiesViewModel
    {
        private const string validationPattern = @"([1-9][0-9]+\.?[1-9]*;?)*";

        [Display(Name ="X:")]
        [Required]
        [RegularExpression(validationPattern)]
        public string XCoordinates { get; set; }

        [Display(Name = "Y:")]
        [Required]
        [RegularExpression(validationPattern)]
        public string YCoordinates { get; set; }
    }

    public class SectionPropertiesController : Controller
    {
        // GET: SectionProperties
        public ActionResult Index()
        {
            return View(new SectionPropertiesViewModel());
        }
    }
}