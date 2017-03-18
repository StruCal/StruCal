using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Common.Geometry;

namespace Calculators.RCBeam
{
    public static class RcBeamCalculator
    {
        public static CalculationResult GetSectionCapacity(Concrete concrete, Steel steel, IList<PointD> sectionCoordinates, IList<Bar> bars, IList<LoadCase> loadCases /*IProgress<ProgressArgument> progressIndicatior*/)
        {
            var result = new CalculationResult();

            var capacity = new SectionCapacity(concrete, steel);
            var section = new Section(sectionCoordinates);
            var loadCaseResults = new List<LoadCaseResult>();
            for (int i = 0; i <= loadCases.Count - 1; i++) 
            {
                var loadCase = loadCases[i];
                //progressIndicatior.Report(ProgressArgument.CalculateProgress(i, loadCases.Count, loadCase.Name));
                var loadCaseResult = capacity.CalculateCapacity(loadCase.NormalForce, section, bars);
                loadCaseResult.LoadCase = loadCase;
                loadCaseResults.Add(loadCaseResult);
            }

            result.Cz = section.Cz;
            result.H = section.H;
            result.LoadCaseResults = loadCaseResults;
            result.MaxTensionForce = AxialCapacity.TensionCapacity(bars, steel);
            result.MaxCompressionForce = AxialCapacity.CompressionCapacity(sectionCoordinates, concrete);

            return result;
        }
        //public static IEnumerable<DetailedResult> GetDetailedResults(Concrete concrete, Steel steel, IEnumerable<LoadCaseResult> calcualtionResults)
        //{
        //    var resultList = new List<DetailedResult>();
        //    foreach (var calculationResult in calcualtionResults)
        //    {
        //        var result = DetailedResult.PrepareDetailedResults(calculationResult, steel, concrete);
        //        resultList.Add(result);
        //    }
        //    return resultList;
        //}
    }
    public class InteractionCurveCalculator
    {
        private readonly int deltaAngle = 5;
        private IList<Bar> bars;
        private IList<PointD> coordinates;
        private Concrete concrete;
        private Steel steel;
        IList<LoadCase> loadCases;
        public InteractionCurveCalculator(Concrete concrete, Steel steel, IList<Bar> bars, IList<PointD> coordinates, IList<LoadCase> loadCases)
        {
            this.concrete = concrete;
            this.steel = steel;
            this.concrete = concrete;
            this.steel = steel;
            this.loadCases = loadCases;
            this.bars = bars;
            this.coordinates = coordinates;
        }
        public IEnumerable<InteractionCurveResult> GetInteractionCurve()
        {
            var sectionCapacity = new SectionCapacity(concrete, steel);
            var result = new List<InteractionCurveResult>();
            for (int i = 0; i <= loadCases.Count - 1; i++) 
            {
                var loadCase = loadCases[i];
                //progress.Report(ProgressArgument.CalculateProgress(i, loadCases.Count, loadCase.Name));
                var interactionPoints = new List<PointD>();
                int angle = 0;
                while (angle <= 360)
                {
                    var rotatedCoordinates = this.rotateSectionCoordinates(angle);
                    var rotatedSection = new Section(rotatedCoordinates);
                    var rotatedBars = this.rotateBarCoordinates(angle);
                    var capacityResult = sectionCapacity.CalculateCapacity(loadCase.NormalForce, rotatedSection, rotatedBars);
                    if (double.IsNaN(capacityResult.X))
                    {
                        throw new NotImplementedException();
                    }
                    double mx, my;
                    calculatePrincipalMoments(angle, capacityResult.Mrd, out mx, out my);
                    var interactionMoments = new PointD
                    {
                        X = mx,
                        Y = my
                    };
                    interactionPoints.Add(interactionMoments);
                    angle = angle + this.deltaAngle;
                }
                var interactionResult = new InteractionCurveResult
                {
                    LoadCase = loadCase,
                    Moments = interactionPoints,
                };
                result.Add(interactionResult);
            }
            return result;
        }
        private IList<Bar> rotateBarCoordinates(double angle)
        {
            List<Bar> newBars = new List<Bar>();
            foreach (var bar in this.bars)
            {
                double x = bar.X * Math.Cos(angle * Math.PI / 180) - bar.Y * Math.Sin(angle * Math.PI / 180);
                double y = bar.X * Math.Sin(angle * Math.PI / 180) + bar.Y * Math.Cos(angle * Math.PI / 180);
                var newBar = new Bar() { X = x, Y = y, D = bar.D };
                newBars.Add(newBar);
            }
            return newBars;
        }
        private IList<PointD> rotateSectionCoordinates(double angle)
        {
            List<PointD> coordinates = new List<PointD>();
            foreach (var point in this.coordinates)
            {
                double x = point.X * Math.Cos(angle * Math.PI / 180) - point.Y * Math.Sin(angle * Math.PI / 180);
                double y = point.X * Math.Sin(angle * Math.PI / 180) + point.Y * Math.Cos(angle * Math.PI / 180);
                coordinates.Add(new PointD(x, y));
            }
            return coordinates;
        }
        private void calculatePrincipalMoments(double angle, double moment, out double mx, out double my)
        {
            my = moment * Math.Cos((90 - angle) * Math.PI / 180);
            mx = moment * Math.Sin((90 - angle) * Math.PI / 180);
        }
    }
    
    
}
