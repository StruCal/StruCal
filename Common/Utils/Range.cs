using Common.Extensions;
using System.Collections.Generic;

namespace Common.Utils
{
    public static class Range
    {
        public static IEnumerable<double> GetRange(double startTime, double endTime, double step)
        {
            var time = startTime;
            while (time < endTime || time.IsApproximatelyEqualTo(endTime))
            {
                yield return time;
                time += step;
            }
        }
    }
}