using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Output
{
    public class TimeResult
    {
        public double Time { get; private set; }
        public double MaxStress { get; private set; }
        public double MinStress { get; private set; }
        public IEnumerable<MeshColorResult> MeshResults { get; private set; }

        public static TimeResult GenerateTimeResult(double time, double maxStress, double minStress, IEnumerable<MeshColorResult> meshColorResults)
        {
            return new TimeResult
            {
                Time = time,
                MaxStress = maxStress,
                MinStress = minStress,
                MeshResults = meshColorResults
            };
        }
    }
}
