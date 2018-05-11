using NUnit.Framework;
using StruCal.Validators;
using System.Text.RegularExpressions;

namespace StruCal.Tests.Validators
{
    [TestFixture]
    public class RegexPatternsTests
    {
        [TestCase("10;20;30")]
        [TestCase("00;20 30;20.5 -20;18.2")]
        [TestCase("10;20 30.;20 -;8")]
        [TestCase("i10;20 30;20")]
        [TestCase("10;20 30;20;")]
        [TestCase("10;20;; 30;")]
        [TestCase("10;20 20;5..0")]
        [TestCase("10,5; 20,8 ;30")]
        [TestCase("+10;20 30.2.3;")]
        public void RegexPatternTests_CustomSectionValidationPattern_ValidationShowErrors(string inputData)
        {
            var regex = new Regex(RegexPatterns.CustomSectionValidationPattern);

            var result = regex.Match(inputData);
            Assert.IsFalse(result.Success);
        }

        [TestCase("10;20 30;40 50;60")]
        [TestCase("-10;20 -30;-50 -80;100.2")]
        [TestCase("1.1;2.2 -5.02;-4.02")]
        [TestCase("0.0;2 -30;-0.02")]
        [TestCase("4;2.2 5;10 15;-0.002")]
        public void RegexPatternTests_CustomSectionValidationPattern_ValidationPassed(string inputData)
        {
            var regex = new Regex(RegexPatterns.CustomSectionValidationPattern);

            var result = regex.Match(inputData);
            Assert.IsTrue(result.Success);
        }

        [TestCase("-4")]
        [TestCase("-4.0")]
        [TestCase("00.1")]
        [TestCase("0.1k")]
        [TestCase("k4")]
        [TestCase("-100.001")]
        [TestCase("4,3")]
        [TestCase("20k")]
        [TestCase("+20.1")]
        public void RegexPatternTests_PositiveNumberValidationPattern_ValidationShowErrors(string inputData)
        {
            var regex = new Regex(RegexPatterns.PositiveNumberValidationPattern);

            var result = regex.Match(inputData);
            Assert.IsFalse(result.Success);
        }

        [TestCase("4")]
        [TestCase("0.505")]
        [TestCase("8.5")]
        [TestCase("1.2")]
        [TestCase("100.00")]
        public void RegexPatternTests_PositiveNumberValidationPattern_ValidationPassed(string inputData)
        {
            var regex = new Regex(RegexPatterns.PositiveNumberValidationPattern);

            var result = regex.Match(inputData);
            Assert.IsTrue(result.Success);
        }

        [TestCase("10;20;-30")]
        [TestCase("00;20 30;20.5;00.5 -20;18.2;0")]
        [TestCase("10;20 30.;20 -;8")]
        [TestCase("i10;20 30;20;-20")]
        [TestCase("10;20;-10 30;20;10")]
        [TestCase("10;20;; 30;")]
        [TestCase("10;20;10 20;5..0")]
        [TestCase("10,5; 20,8 ;30")]
        [TestCase("+10;20 30.2.3;")]
        public void RegexPatternTests_BarCoordinatesValidationPattern_ValidationShowErrors(string inputData)
        {
            var regex = new Regex(RegexPatterns.BarCoordinatesValidationPattern);

            var result = regex.Match(inputData);
            Assert.IsFalse(result.Success);
        }

        [TestCase("10;20;10 30;40;30 50;60;20.5")]
        [TestCase("-10;20;18 -30;-50;20 -80;100.2;18")]
        [TestCase("1.1;2.2;20 -5.02;-4.02;10")]
        [TestCase("0.0;2;10.5 -30;-0.02;20")]
        [TestCase("4;2.2;20 5;10;50 15;-0.002;20.05")]
        public void RegexPatternTests_BarCoordinatesValidationPattern_ValidationPassed(string inputData)
        {
            var regex = new Regex(RegexPatterns.BarCoordinatesValidationPattern);

            var result = regex.Match(inputData);
            Assert.IsTrue(result.Success);
        }
    }
}