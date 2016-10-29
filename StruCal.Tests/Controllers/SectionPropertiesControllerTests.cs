using NUnit.Framework;
using StruCal.Controllers;
using StruCal.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.Controllers.Tests
{
    [TestFixture]
    public class SectionPropertiesControllerTests
    {
        /*taken from http://stackoverflow.com/questions/2167811/unit-testing-asp-net-dataannotations-validation */
        private IList<ValidationResult> validateModel(object model)
        {
            var validationResults = new List<ValidationResult>();
            var context = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, context, validationResults, true);
            return validationResults;
        }

        [TestCase("10;20;30")]
        [TestCase("00;20;30")]
        [TestCase("10;20;30.")]
        [TestCase("i10;20;30;")]
        [TestCase("10;20k;30;")]
        [TestCase("10;20;;30;")]
        [TestCase("nm10;20;30")]
        [TestCase("10,5;20,8;30")]
        [TestCase("+10;20;30.2.3;")]
        public void SectionPropertiesController_ValidationViewModelTests_ValidationShowErrors(string inputData)
        {
            var viewModel = new SectionPropertiesViewModel()
            {
                XCoordinates = inputData,
                YCoordinates = inputData,
            };

            var actualErrors = validateModel(viewModel);
            Assert.IsTrue(actualErrors.Count > 0);
        }

        [TestCase("10;20;30;")]
        [TestCase("-10;20;-30;")]
        [TestCase("1.1;2.2;-5.02;")]
        [TestCase("0.0;2;-30;")]
        [TestCase("4;2.2;5;10;15;")]
        public void SectionPropertiesController_ValidationViewModelTests_ValidationPassed(string inputData)
        {
            var viewModel = new SectionPropertiesViewModel()
            {
                XCoordinates = inputData,
                YCoordinates = inputData,
            };

            var actualErrors = validateModel(viewModel);
            Assert.IsTrue(actualErrors.Count == 0);
        }
    }
}