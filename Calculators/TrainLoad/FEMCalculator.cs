using Calculators.TrainLoad.Helpers;
using Common.Geometry;
using FEM2D.Elements.Beam;
using FEM2D.Nodes;
using FEM2DCommon.DTO;
using FEM2DCommon.ElementProperties;
using FEM2DDynamics.Elements.Beam;
using FEM2DDynamics.Results;
using FEM2DDynamics.Solver;
using FEM2DDynamics.Structure;
using FEMCommon.ElementProperties.DynamicBeamPropertiesBuilder;
using FEMCommon.ElementProperties.SectionBuilders.CustomSection;
using System;
using System.Collections.Generic;
using System.Linq;
using Calculators.TrainLoad.Extensions;
using System.Text;
using System.Threading.Tasks;
using FEMSection = FEM2DCommon.Sections.Section;

namespace Calculators.TrainLoad
{
    internal class FEMCalculator
    {
        private const double dampingRatio = 0.03;

        private readonly TrainLoadInput trainLoadInput;
        private DynamicStructure structure;
        private IDictionary<IDynamicBeamElement, string> elementBarIdMap;


        public FEMCalculator(TrainLoadInput trainLoadInput)
        {
            this.trainLoadInput = trainLoadInput;
            this.elementBarIdMap = new Dictionary<IDynamicBeamElement, string>();

            var settings = this.trainLoadInput.TimeSettings.ToDynamicSolverSettings(dampingRatio);
            this.structure = new DynamicStructure(settings);
            this.trainLoadInput = trainLoadInput;
        }

        public FemCalculatorResult Calculate()
        {
            GenerateNodesAndElements();
            GenerateSupports();
            GenerateMovingLoads();

            structure.Solve();

            var results = structure.Results.BeamResults;
            return new FemCalculatorResult
            {
                BeamElementBarIDMap = this.elementBarIdMap,
                BeamResults = results,
            };
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
