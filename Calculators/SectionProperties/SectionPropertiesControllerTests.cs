//using NUnit.Framework;
//using StruCal.Controllers;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace StruCal.Controllers.Tests
//{
//    [TestFixture()]
//    public class SectionPropertiesControllerTests
//    {
//        /*taken from http://stackoverflow.com/questions/2167811/unit-testing-asp-net-dataannotations-validation */
//        private IList<ValidationResult> validateModel(object model)
//        {
//            var validationResults = new List<ValidationResult>();
//            var context = new ValidationContext(model, null, null);
//            Validator.TryValidateObject(model, context, validationResults, true);
//            return validationResults;
//        }

//        [TestCase("10;20;30")]
//        public void SectionPropertiesController_ValidationViewModelTests_Passed(string inputData)
//        {
//            var viewModel = new SectionPropertiesViewModel()
//            {
//                XCoordinates = inputData,
//                YCoordinates = inputData,
//            };

//            var actualErrors = validateModel(viewModel);
//            Assert.IsTrue(actualErrors.Count > 0);
//        }

//    }
//}