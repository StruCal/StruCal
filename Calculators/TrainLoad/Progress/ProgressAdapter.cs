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
        private readonly Action<ProgressMsg> externalProgress;

        public ProgressAdapter(Action<ProgressMsg> externalProgress)
        {
            this.externalProgress = externalProgress;
        }

        private static ProgressMsg Convert(ProgressMessage progress)
        {
            return new ProgressMsg { Progress = progress.Progress };
        }

        public Action<ProgressMessage> FemProgress =>
            p => this.externalProgress.Invoke(Convert(p));
    }
}