using Common.Utils;
using FEM2DDynamics.Solver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Input
{
    public class TimeSettings
    {
        public double StartTime { get; set; }
        public double EndTime { get; set; }
        public double DeltaTime { get; set; }
        public double DeltaTimeResults { get; set; }

        public DynamicSolverSettings ToDynamicSolverSettings(double dampingRatio)
        {
            return new DynamicSolverSettings
            {
                DampingRatio = dampingRatio,
                StartTime = this.StartTime,
                EndTime = this.EndTime,
                DeltaTime = this.DeltaTime,
            };
        }

        public IEnumerable<double> GetTimeRange()
        {
            var result = Range.GetRange(this.StartTime, this.EndTime, this.DeltaTimeResults);
            return result;
        }
    }
}
