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


        public ResultCreator(IGradient gradient, TimeSettings timeSettings)
        {
            this.color = new ColorProvider(gradient);
            this.timeSettings = timeSettings;
        }

        public TrainLoadOutput Calculate(FemCalculatorResult femResults, IList<VertexInput> vertices)
        {
            var beamStressCalculatorMap = GetBeamStressCalculatorMap(femResults);
            var beamVeriticesMap = GetBeamVerticesMap(femResults, vertices);

            var times = this.timeSettings.GetTimeRange().ToList();

            Parallel.ForEach(times, time =>
            {
                var meshStressResults = new List<MeshStressResult>();
                foreach (var beamStressCalculatorPair in beamStressCalculatorMap)
                {
                    var beam = beamStressCalculatorPair.Key;
                    var stressCalculator = beamStressCalculatorPair.Value;

                    var beamResult = femResults.BeamResults.GetResult(beam, time);

                    var beamVertices = beamVeriticesMap[beam];
                    var vertexResultCalculator = new VertexResultCalculator(beamResult, beam, stressCalculator);
                    var vertexMeshRestresResults = GenerateMeshStressResult(beamVertices, vertexResultCalculator);
                    meshStressResults.AddRange(vertexMeshRestresResults);
                }

                var stresses = GetStresses(meshStressResults);

                var maxStress = stresses.Max();
                var minStress = stresses.Min();
                var meshColorResults = ConvertStressToColor(meshStressResults, maxStress, minStress);
                var timeResult = TimeResult.GenerateTimeResult(time, maxStress, minStress, meshColorResults);
                timeResults.Add(timeResult);
            });
            var resultData = this.GenerateTimeResults();
            return resultData;
        }

        private static Dictionary<IDynamicBeamElement, List<VertexInput>> GetBeamVerticesMap(FemCalculatorResult femResults, IList<VertexInput> vertices)
        {
            return femResults.BeamElementBarIDMap.Select(e => e.Key)
                .ToDictionary(e => e, f => vertices.Where(g => g.BarId == femResults.BeamElementBarIDMap[f]).ToList());
        }

        private TrainLoadOutput GenerateTimeResults()
        {
            return new TrainLoadOutput
            {
                TimeResults = timeResults.OrderBy(e => e.Time).ToList(),
                MaxAbsoluteDisplacement = GetMaxDisplacement(),
                TimeSettings = this.timeSettings
            };
        }

        private static IDictionary<IDynamicBeamElement,BeamStressCalculator> GetBeamStressCalculatorMap(FemCalculatorResult femResults)
        {
            var beamStressCalculatorMap = femResults.BeamElementBarIDMap
                .Select(e => e.Key)
                .ToDictionary(f => f, e => new BeamStressCalculator(e.BeamProperties.Section.SectionProperties));
            return beamStressCalculatorMap;
        }
            
        private static IEnumerable<MeshStressResult> GenerateMeshStressResult(IEnumerable<VertexInput> beamVertices, VertexResultCalculator vertexResultCalculator)
        {
            var result = new List<MeshStressResult>();
            foreach (var beamVertex in beamVertices)
            {
                var vertexResults = vertexResultCalculator.GetVertexStressResult(beamVertex.Vertices).ToList();
                var meshResult = MeshStressResult.GenerateMeshResult(beamVertex, vertexResults);
                result.Add(meshResult);
            }
            return result;
        }

        private static List<double> GetStresses(List<MeshStressResult> meshStressResults)
        {
            return meshStressResults
                            .Select(e => e.VertexResults)
                            .SelectMany(e => e)
                            .Select(e => e.Stress)
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
