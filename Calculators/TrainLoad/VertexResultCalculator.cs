using Calculators.TrainLoad.Helpers;
using Calculators.TrainLoad.Output;
using Common.Geometry;
using FEM2DDynamics.Elements.Beam;
using FEM2DDynamics.Results.Beam;
using FEM2DStressCalculator.Beams;
using System.Collections.Generic;
using System.Linq;

namespace Calculators.TrainLoad
{
    internal class VertexResultCalculator
    {
        private readonly DynamicBeamElementResult beamResult;
        private readonly IDynamicBeamElement beam;
        private readonly BeamStressCalculator stressCalculator;

        public VertexResultCalculator(DynamicBeamElementResult beamResult, IDynamicBeamElement beam, BeamStressCalculator stressCalculator)
        {
            this.beamResult = beamResult;
            this.beam = beam;
            this.stressCalculator = stressCalculator;
        }

        public static VertexResultCalculator FromFEMResult(FemResultProvider femResults, IDynamicBeamElement beam, double time)
        {
            var stressCalculator = femResults.GetStressCalculator(beam);
            var beamResult = femResults.GetResult(beam, time);
            return new VertexResultCalculator(beamResult, beam, stressCalculator);
        }

        public VertexStressResult GetVertexStressResult(Point3D vertex)
        {
            var location = vertex.ToFEMCoordinateSystem();
            var relativePosition = (location.X - beam.Nodes[0].Coordinates.X) / beam.Length;
            var displ = beamResult.GetDisplacement(relativePosition);
            var acceleration = beamResult.GetAcceleration(relativePosition);
            var forces = beamResult.GetBeamForces(relativePosition);

            var stress = stressCalculator.NormalStressAt(forces, location.Y);

            var vertexResult = VertexStressResult.GenerateVertexResult(vertex, displ, stress, acceleration);
            return vertexResult;
        }

        public IEnumerable<VertexStressResult> GetVertexStressResult(IEnumerable<Point3D> vertices)
        {
            return vertices.Select(v => this.GetVertexStressResult(v));
        }
    }
}