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
        public IEnumerable<MeshColorResult> MeshResults { get; private set; }

        public static TimeResult GenerateTimeResult(double time, IEnumerable<MeshColorResult> meshColorResults)
        {
            return new TimeResult
            {
                Time = time,
                MeshResults = meshColorResults
            };
        }
    }
}
