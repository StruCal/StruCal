using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace StruCal.Validators
{
    public class TheSameLength : ValidationAttribute
    {
        private static readonly char separator = ';';

        public string[] PropertyNames { get; private set; }

        public TheSameLength(params string[] propertyNames)
        {
            this.PropertyNames = propertyNames;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var properties = this.PropertyNames.Select(validationContext.ObjectType.GetProperty);
            var valueToCompare = properties.Select(p => p.GetValue(validationContext.ObjectInstance, null)).OfType<string>().FirstOrDefault();

            var valueLength = Convert.ToString(value).Split(separator).Length;
            var valueToCompareLength = valueToCompare.Split(separator).Length;

            if (valueLength != valueToCompareLength)
            {
                return new ValidationResult(this.FormatErrorMessage(validationContext.DisplayName));
            }
            return null;
        }
    }
}