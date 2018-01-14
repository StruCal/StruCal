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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad
{
    internal class FEMCalculator
    {
        const int steelDensity = 7850;

        private StructureGeometry structureGeometry;
        private IList<Node> nodes;

        private DynamicStructure structure;

        public IDictionary<string, IDynamicBeamElement> BarIdBeamElementMap { get; private set; }

        public FEMCalculator(StructureGeometry structureGeometry)
        {
            this.structureGeometry = structureGeometry;
            this.nodes = new List<Node>();
            this.BarIdBeamElementMap = new Dictionary<string, IDynamicBeamElement>();

            var settings = new DynamicSolverSettings
            {
                DeltaTime = 0.01,
                EndTime = 400,
                StartTime = 0
            };
            this.structure = new DynamicStructure(settings);
        }

        public DynamicBeamElementResults Calculate()
        {
            GenerateNodesAndElements();
            GenerateSupports();

            structure.LoadFactory.AddPointMovingLoad(-1000, 0, 1);
            structure.LoadFactory.AddPointMovingLoad(-2000, -4, 1);


            structure.Solve();
            var results = structure.Results.BeamResults;
            return results;
        }

        private void GenerateSupports()
        {
            foreach (var support in this.structureGeometry.Supports)
            {
                var restraint = RestraintConverter.ConvertFromString(support.Direction);
                var location = support.Location.ToFEMCoordinateSystem();
                this.structure.NodeFactory.SetSupportAt(location, restraint);
            }
        }

        private void GenerateNodesAndElements()
        {
            foreach (var bar in this.structureGeometry.Bars)
            {
                //!!!!!!!!!!! CHANGE
                var properties = BeamProperties.Default;
                var dynamicProperties = new DynamicBeamProperties
                {
                    BeamProperties = properties,
                    Density = steelDensity,
                };


                var startPoint = new PointD(bar.StartPoint.Z, bar.StartPoint.Y);
                var endPoint = new PointD(bar.EndPoint.Z, bar.EndPoint.Y);
                var startNode = structure.NodeFactory.Create(startPoint);
                var endNode = structure.NodeFactory.Create(endPoint);
                var element = structure.ElementFactory.CreateBeam(startNode, endNode, dynamicProperties);

                this.BarIdBeamElementMap.Add(bar.Id, element);
            }
        }
    }
}
