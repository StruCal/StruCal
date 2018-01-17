using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Input
{
    public class MovingLoad
    {
        public double Speed { get; set; }
        public IEnumerable<MovingForce> Forces { get; set; }
    }
}
