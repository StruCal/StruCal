using Calculators.TrainLoad.GradienColor;
using Calculators.TrainLoad.Helpers;
using Calculators.TrainLoad.Input;
using Calculators.TrainLoad.Output;
using FEM2DStressCalculator.Beams;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad
{
    internal class ResultCreator
    {
        private readonly ColorProvider color;
        private readonly TimeSettings timeSettings;

        public ResultCreator(IGradient gradient, TimeSettings timeSettings)
        {
            this.color = new ColorProvider(gradient);
            this.timeSettings = timeSettings;
        }

        public TrainLoadOutput Calculate(FemCalculatorResult femResults, IList<VertexInput> vertices)
        {

            var deltaT = this.timeSettings.DeltaTimeResults;
            var time = this.timeSettings.StartTime;
            var endTime = this.timeSettings.EndTime;

            var results = femResults.BeamResults;

            var beams = femResults.BeamElementBarIDMap.Select(e => e.Key).ToList();
            var stressCalculators = beams.Select(e => new BeamStressCalculator(e.BeamProperties.Section.SectionProperties)).ToList();
            
            var timeResults = new List<TimeResult>();

            while (time <= endTime)
            {
                var meshStressResults = new List<MeshStressResult>();
                var stresses = new List<double>();
                for (int i = 0; i < beams.Count; i++)
                {
                    var beam = beams[i];
                    var stressCalculator = stressCalculators[i];
                    var barID = femResults.BeamElementBarIDMap[beam];
                    
                    var beamResult = results.GetResult(beam, time);

                    var beamVertices = vertices.Where(e => e.BarId == barID);
                    foreach (var beamVertex in beamVertices)
                    {
                        var vertexResults = new List<VertexStressResult>();
                        foreach (var vertex in beamVertex.Vertices)
                        {

                            var location = vertex.ToFEMCoordinateSystem();
                            var relativePosition = (location.X - beam.Nodes[0].Coordinates.X) / beam.Length;
                            var displ = beamResult.GetDisplacement(relativePosition);
                            var forces = beamResult.GetBeamForces(relativePosition);

                            var stress = stressCalculator.NormalStressAt(forces, location.Y);

                            stresses.Add(stress);

                            var vertexResult = new VertexStressResult
                            {
                                Position = vertex,
                                Stress = stress,
                                Displacement = displ,
                            };
                            vertexResults.Add(vertexResult);
                        }
                        var meshResult = new MeshStressResult
                        {
                            BarId = beamVertex.BarId,
                            MeshId = beamVertex.MeshId,
                            VertexResults = vertexResults,
                        };
                        meshStressResults.Add(meshResult);
                    }

                }

                var maxStress = stresses.Max();
                var minStress = stresses.Min();

                var meshColorResults = meshStressResults.Select(e => new MeshColorResult
                {
                    BarId = e.BarId,
                    MeshId = e.MeshId,
                    VertexResults = e.VertexResults.Select(f => new VertexColorResult
                    {
                        Displacement = f.Displacement,
                        Position = f.Position,
                        Color = this.color.GetColor(f.Stress, maxStress, minStress),
                    })
                }).ToList();

                var timeResult = new TimeResult();
                timeResult.Time = time;
                timeResult.MaxStress = maxStress;
                timeResult.MinStress = minStress;
                timeResult.MeshResults = meshColorResults;
                timeResults.Add(timeResult);
                time += deltaT;
            }

            var resultData = new TrainLoadOutput();
            resultData.TimeResults = timeResults;

            var extremes = timeResults.SelectMany(e => e.MeshResults)
                .SelectMany(e => e.VertexResults)
                .Select(e=>e.Displacement)
                .ToList();

            resultData.MaxAbsoluteDisplacement = extremes.Max();
            resultData.TimeSettings = this.timeSettings;
            return resultData;
        }
    }
}
