using Calculators.TrainLoad.GradienColor;
using Calculators.TrainLoad.Helpers;
using Calculators.TrainLoad.Input;
using Calculators.TrainLoad.Output;
using Common.Utils;
using FEM2DDynamics.Elements.Beam;
using FEM2DStressCalculator.Beams;
using System;
using System.Collections.Concurrent;
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

        private ConcurrentBag<TimeResult> timeResults = new ConcurrentBag<TimeResult>();
        private List<IDynamicBeamElement> beams;
        private List<BeamStressCalculator> stressCalculators;


        public ResultCreator(IGradient gradient, TimeSettings timeSettings)
        {
            this.color = new ColorProvider(gradient);
            this.timeSettings = timeSettings;
        }

        public TrainLoadOutput Calculate(FemCalculatorResult femResults, IList<VertexInput> vertices)
        {

            this.beams = femResults.BeamElementBarIDMap.Select(e => e.Key).ToList();
            this.stressCalculators = beams.Select(e => new BeamStressCalculator(e.BeamProperties.Section.SectionProperties)).ToList();

            var times = this.timeSettings.GetTimeRange().ToList();

            Parallel.ForEach(times, time =>
            {
                var meshStressResults = new List<MeshStressResult>();
                for (int i = 0; i < beams.Count; i++)
                {
                    var beam = beams[i];
                    var stressCalculator = stressCalculators[i];
                    var barID = femResults.BeamElementBarIDMap[beam];

                    var beamResult = femResults.BeamResults.GetResult(beam, time);

                    var beamVertices = vertices.Where(e => e.BarId == barID);
                    var vertexResultCalculator = new VertexResultCalculator(beamResult, beam, stressCalculator);
                    foreach (var beamVertex in beamVertices)
                    {
                        var vertexResults = vertexResultCalculator.GetVertexStressResult(beamVertex.Vertices).ToList();
                        var meshResult = MeshStressResult.GenerateMeshResult(beamVertex, vertexResults);
                        meshStressResults.Add(meshResult);
                    }

                }

                var stresses = GetStresses(meshStressResults);

                var maxStress = stresses.Max();
                var minStress = stresses.Min();
                var meshColorResults = ConvertStressToColor(meshStressResults, maxStress, minStress);

                var timeResult = new TimeResult
                {
                    Time = time,
                    MaxStress = maxStress,
                    MinStress = minStress,
                    MeshResults = meshColorResults
                };
                timeResults.Add(timeResult);
            });

            var resultData = new TrainLoadOutput
            {
                TimeResults = timeResults.OrderBy(e => e.Time).ToList(),
                MaxAbsoluteDisplacement = GetMaxDisplacement(),
                TimeSettings = this.timeSettings
            };
            return resultData;
        }

        private static List<double> GetStresses(List<MeshStressResult> meshStressResults)
        {
            return meshStressResults
                            .Select(e => e.VertexResults)
                            .SelectMany(e => e).
                            Select(e => e.Stress)
                            .ToList();
        }

        private double GetMaxDisplacement()
        {
            var result = timeResults.SelectMany(e => e.MeshResults)
                            .SelectMany(e => e.VertexResults)
                            .Select(e => Math.Abs(e.Displacement))
                            .ToList()
                            .Max();
            return result;
        }

        private List<MeshColorResult> ConvertStressToColor(List<MeshStressResult> meshStressResults, double maxStress, double minStress)
        {
            return meshStressResults.Select(e => new MeshColorResult
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
        }




    }
}
