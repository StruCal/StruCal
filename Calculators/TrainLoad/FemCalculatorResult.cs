using FEM2DDynamics.Elements.Beam;
using FEM2DDynamics.Results;
using FEM2DDynamics.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad
{
    internal class FemCalculatorResult
    {
        public IDictionary<IDynamicBeamElement, string> BeamElementBarIDMap { get; set; }
        public DynamicBeamElementResults BeamResults { get; set; }
    }
}
