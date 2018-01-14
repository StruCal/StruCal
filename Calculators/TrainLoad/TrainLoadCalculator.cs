using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad
{
    public class TrainLoadCalculator
    {
        private readonly TrainLoadInput trainLoadInput;
        private readonly IGradientCalculator gradientCalculator;
        private readonly FEMCalculator femCalculator;

        public TrainLoadCalculator(TrainLoadInput trainLoadInput)
        {
            this.trainLoadInput = trainLoadInput;
            this.gradientCalculator = new LinearGradientCalculator(this.trainLoadInput.MaxColor, this.trainLoadInput.MinColor);
            this.femCalculator = new FEMCalculator(this.trainLoadInput.StructureGeometry);
        }

        public void Calculate()
        {
            this.femCalculator.Calculate();
        }


    }
}
