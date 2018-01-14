using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Output
{
    public class TimeResult
    {
        public double Time { get; set; }
        public double MaxStress { get; set; }
        public double MinStress { get; set; }
        public IEnumerable<MeshColorResult> MeshResults { get; set; }
    }
}
