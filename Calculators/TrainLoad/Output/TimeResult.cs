using System.Collections.Generic;

namespace Calculators.TrainLoad.Output
{
    public class TimeResult
    {
        public double Time { get; private set; }
        public IEnumerable<MeshColorResult> MeshResults { get; private set; }
        public double Acceleration { get; private set; }

        public static TimeResult GenerateTimeResult(double time, double acceleration, IEnumerable<MeshColorResult> meshColorResults)
        {
            return new TimeResult
            {
                Time = time,
                MeshResults = meshColorResults,
                Acceleration = acceleration
            };
        }
    }
}