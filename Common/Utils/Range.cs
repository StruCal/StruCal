using Common.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
