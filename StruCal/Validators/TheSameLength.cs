using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

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
            var firstValue = Convert.ToString(value);
            var secondValue = properties.Select(p => p.GetValue(validationContext.ObjectInstance, null)).OfType<string>().FirstOrDefault();

            if (string.IsNullOrEmpty(firstValue) || string.IsNullOrEmpty(secondValue))
                return null;

            var firstValueLength = Convert.ToString(value).Split(separator).Length;
            var secondValueLength = secondValue.Split(separator).Length;

            if (firstValueLength != secondValueLength)
            {
                return new ValidationResult(this.FormatErrorMessage(validationContext.DisplayName));
            }
            return null;
        }
    }
}