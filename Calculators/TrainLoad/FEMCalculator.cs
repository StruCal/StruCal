using Calculators.TrainLoad.Extensions;
using Calculators.TrainLoad.Helpers;
using Calculators.TrainLoad.Progress;
using Common.Geometry;
using FEM2DDynamics.Elements.Beam;
using FEM2DDynamics.Structure;
using FEMCommon.ElementProperties.DynamicBeamPropertiesBuilder;
using System.Collections.Generic;
using FEMSection = FEM2DCommon.Sections.Section;

namespace Calculators.TrainLoad
{
    internal class FEMCalculator
    {
        private const double dampingRatio = 0.03;

        private readonly TrainLoadInput trainLoadInput;
        private readonly ProgressAdapter progress;

        private DynamicStructure structure;
        private IDictionary<IDynamicBeamElement, string> elementBarIdMap;

        public FEMCalculator(TrainLoadInput trainLoadInput, ProgressAdapter progress = null)
        {
            this.trainLoadInput = trainLoadInput;
            this.progress = progress;
            this.elementBarIdMap = new Dictionary<IDynamicBeamElement, string>();

            var settings = this.trainLoadInput.TimeSettings.ToDynamicSolverSettings(dampingRatio);
            this.structure = new DynamicStructure(settings);
            this.trainLoadInput = trainLoadInput;
        }

        public FemResultProvider Calculate()
        {
            GenerateNodesAndElements();
            GenerateSupports();
            GenerateMovingLoads();

            structure.Solve(this.progress.FemProgress);

            var results = structure.Results.BeamResults;
            return new FemResultProvider(this.elementBarIdMap, results);
        }

        private void GenerateMovingLoads()
        {
            var speed = trainLoadInput.MovingLoads.Speed;
            foreach (var movingLoad in this.trainLoadInput.MovingLoads.Forces)
            {
                structure.LoadFactory.AddPointMovingLoad(movingLoad.Load, movingLoad.BasePosition, speed);
            }
        }

        private void GenerateSupports()
        {
            foreach (var support in this.trainLoadInput.StructureGeometry.Supports)
            {
                var restraint = RestraintConverter.ConvertFromString(support.Direction);
                var location = support.Location.ToFEMCoordinateSystem();
                this.structure.NodeFactory.SetSupportAt(location, restraint);
            }
        }

        private void GenerateNodesAndElements()
        {
            foreach (var bar in this.trainLoadInput.StructureGeometry.Bars)
            {
                var section = new FEMSection(bar.Section.Perimeters.Convert());

                var dynamicProperties = DynamicBeamPropertiesBuilder.Create()
                    .SetSteel()
                    .SetSection(section)
                    .Build();

                var startPoint = new PointD(bar.StartPoint.Z, bar.StartPoint.Y);
                var endPoint = new PointD(bar.EndPoint.Z, bar.EndPoint.Y);
                var startNode = structure.NodeFactory.Create(startPoint);
                var endNode = structure.NodeFactory.Create(endPoint);
                var element = structure.ElementFactory.CreateBeam(startNode, endNode, dynamicProperties);

                this.elementBarIdMap.Add(element, bar.Id);
            }
        }
    }
}