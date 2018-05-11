using Calculators.TrainLoad.Input;
using System.Collections.Generic;

namespace Calculators.TrainLoad.Output
{
    public class TrainLoadOutput
    {
        public double MaxAbsoluteDisplacement { get; set; }
        public IEnumerable<TimeResult> TimeResults { get; set; }
        public TimeSettings TimeSettings { get; set; }
    }
}