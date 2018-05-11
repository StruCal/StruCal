using FEM2DDynamics.Elements.Beam;
using FEM2DDynamics.Results;
using FEM2DDynamics.Results.Beam;
using FEM2DStressCalculator.Beams;
using System.Collections.Generic;
using System.Linq;

namespace Calculators.TrainLoad
{
    internal class FemResultProvider
    {
        public readonly IDictionary<IDynamicBeamElement, string> beamElementBarIDMap;
        public readonly DynamicBeamElementResults beamResults;

        private IDictionary<IDynamicBeamElement, BeamStressCalculator> beamStressCalculatorMap;

        public FemResultProvider(IDictionary<IDynamicBeamElement, string> beamElementBarIDMap, DynamicBeamElementResults beamResults)
        {
            this.beamElementBarIDMap = beamElementBarIDMap;
            this.beamResults = beamResults;
            this.InitializeBeamStressCalculatorMap();
        }

        private void InitializeBeamStressCalculatorMap()
        {
            this.beamStressCalculatorMap = this.beamElementBarIDMap
                .Select(e => e.Key)
                .ToDictionary(f => f, e => new BeamStressCalculator(e.BeamProperties.Section.SectionProperties));
        }

        public BeamStressCalculator GetStressCalculator(IDynamicBeamElement beam) => this.beamStressCalculatorMap[beam];

        public IEnumerable<IDynamicBeamElement> GetBeams() => this.beamStressCalculatorMap.Select(e => e.Key);

        public DynamicBeamElementResult GetResult(IDynamicBeamElement beam, double time) => this.beamResults.GetResult(beam, time);
    }
}