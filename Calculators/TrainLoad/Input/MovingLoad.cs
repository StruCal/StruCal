using System.Collections.Generic;

namespace Calculators.TrainLoad.Input
{
    public class MovingLoad
    {
        public double Speed { get; set; }
        public IEnumerable<MovingForce> Forces { get; set; }
    }
}