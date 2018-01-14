using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Output
{
    public class TrainLoadOutput
    {
        public double MaxAbsoluteDisplacement { get; set; }
        public IEnumerable<TimeResult> TimeResults { get; set; }
    }
}
