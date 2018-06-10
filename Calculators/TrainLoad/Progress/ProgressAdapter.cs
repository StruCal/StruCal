using Common.Utils;
using FEM2DDynamics.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Progress
{
    internal class ProgressAdapter
    {
        private readonly IProgress<ProgressMsg> progress;

        public ProgressAdapter(IProgress<ProgressMsg> externalProgress)
        {
            this.progress = externalProgress;
        }

        private static ProgressMsg Convert(ProgressMessage progress)
        {
            return new ProgressMsg { Progress = progress.Progress };
        }

        public IProgress<ProgressMessage> FemProgress =>
            new Progress<ProgressMessage>(p => this.progress.Report(Convert(p)));
    }
}