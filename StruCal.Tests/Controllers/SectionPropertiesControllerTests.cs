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

        [TestCase("10;20; 30")]
        [TestCase("00;20 30;20")]
        [TestCase("10;20 30.;20")]
        [TestCase("i10;20 ;30;")]
        [TestCase("10;20k 30;20.2")]
        [TestCase("10;20  30;80")]
        [TestCase("nm10;20 30;80.")]
        [TestCase("10,5;20,8 30;20.2")]
        [TestCase("+10;20 30.2.3;")]
        public void SectionPropertiesController_CustomSectionViewModelValidation_ValidationShowErrors(string inputData)
        {
            var viewModel = new CustomSectionViewModel()
            {
                Coordinates = inputData,
                //YCoordinates = inputData,
            };

            var actualErrors = validateModel(viewModel);
            Assert.IsTrue(actualErrors.Count > 0);
        }

        [TestCase("10;20 30;40")]
        [TestCase("-10;20 -30;20.2")]
        [TestCase("1.1;2.2 -5.02;50.2")]
        [TestCase("0.0;2 -30;0.002")]
        [TestCase("4;2.2 10;15")]
        public void SectionPropertiesController_CustomSectionViewModelValidation_ValidationPassed(string inputData)
        {
            var viewModel = new CustomSectionViewModel()
            {
                Coordinates = inputData,
                //YCoordinates = inputData,
            };

            var actualErrors = validateModel(viewModel);
            Assert.IsTrue(actualErrors.Count == 0);
        }

    }
}