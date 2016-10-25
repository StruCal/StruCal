using Calculators.ConcreteCover;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalculatorsTests.ConcreteCover
{
    [TestFixture]
    public class NominalConcreteCoverTests
    {
        [Test]
        [TestCase(1, 0.03d, 0.01d, 0.02d)]
        public void CalculateNominalConcreteCoverTests_(int testCaseNumber, double minimumCover, double allowanceInDesignForDeviation, double expectedCover)
        {
            Calculator coverCalculator = new Calculator()
            {
                MinimumCover = minimumCover,
                AllowanceInDesignForDeviation = allowanceInDesignForDeviation
            };

            coverCalculator.CalculateNominalConcreteCover();
            Assert.AreEqual(expectedCover, coverCalculator.NominalCover);
        }
    }
}
