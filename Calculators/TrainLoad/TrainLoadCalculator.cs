﻿using Calculators.TrainLoad.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using Common.Utils;
using Calculators.TrainLoad.Progress;

namespace Calculators.TrainLoad
{
    public class TrainLoadCalculator
    {
        private readonly TrainLoadInput trainLoadInput;
        private readonly IGradient gradient;
        private readonly FEMCalculator femCalculator;
        private readonly ResultCreator resultCreator;
        private readonly ProgressAdapter progress;

        public TrainLoadCalculator(TrainLoadInput trainLoadInput, Action<ProgressMsg> externalProgress = null)
        {
            this.progress = new ProgressAdapter(externalProgress);
            this.trainLoadInput = trainLoadInput;
            this.gradient = new LinearGradient(this.trainLoadInput.MaxColor, this.trainLoadInput.MinColor, this.trainLoadInput.MiddleColor);
            this.femCalculator = new FEMCalculator(this.trainLoadInput, progress);
            this.resultCreator = new ResultCreator(this.gradient, trainLoadInput.TimeSettings);
        }

        public TrainLoadOutput Calculate()
        {
            var femResult = this.femCalculator.Calculate();
            var output = this.resultCreator.Calculate(femResult, this.trainLoadInput.Vertices);

            return output;
        }
    }
}