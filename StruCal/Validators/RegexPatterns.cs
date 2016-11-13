using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StruCal.Validators
{
    public class RegexPatterns
    {
        public const string CustomSectionValidationPattern = @"^((((-?)(0|[1-9][0-9]*)(\.[0-9]+)?);)+?)$";
        public const string PositiveNumberValidationPattern = @"^((0|[1-9][0-9]*)(\.[0-9]+)?)$";
    }
}