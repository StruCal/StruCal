using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace StruCal.ViewModels
{
    public class SectionPropertyViewData
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }

    }

    public class SectionPropertiesViewModel
    {
        private const string validationPattern = @"^((((-?)(0|[1-9][0-9]*)(\.[0-9]+)?);)+?)$";//@"^([1-9][0-9]+\.?[0-9]*;?)*$";

        [Display(Name = "X coordinates:")]
        [Required]
        [RegularExpression(validationPattern)]
        public string XCoordinates { get; set; }

        [Display(Name = "Y coordinates:")]
        [Required]
        [RegularExpression(validationPattern)]
        public string YCoordinates { get; set; }

        public IEnumerable<SectionPropertyViewData> SectionProperties { get; set; }
    }
}