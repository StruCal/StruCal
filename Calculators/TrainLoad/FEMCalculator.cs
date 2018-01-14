using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad
{
    internal class FEMCalculator
    {
        public FEMCalculator()
        {

        }

        //public void Calculate()
        //{
        //    var properties = BeamProperties.Default;
        //    var dynamicProperties = new DynamicBeamProperties
        //    {
        //        BeamProperties = properties,
        //        Density = 2000,
        //    };
        //    var settings = new DynamicSolverSettings
        //    {
        //        DeltaTime = 0.01,
        //        EndTime = 400,
        //        StartTime = 0
        //    };



        //    var structure = new DynamicStructure(settings);
        //    var node1 = structure.NodeFactory.Create(0, 0);
        //    node1.SetPinnedSupport();
        //    var node2 = structure.NodeFactory.Create(10, 0);
        //    var node3 = structure.NodeFactory.Create(20, 0);
        //    node3.SetPinnedSupport();
        //    var node4 = structure.NodeFactory.Create(30, 0);
        //    var node5 = structure.NodeFactory.Create(40, 0);
        //    node5.SetPinnedSupport();

        //    var beam1 = structure.ElementFactory.CreateBeam(node1, node2, dynamicProperties);
        //    var beam2 = structure.ElementFactory.CreateBeam(node2, node3, dynamicProperties);
        //    var beam3 = structure.ElementFactory.CreateBeam(node3, node4, dynamicProperties);
        //    var beam4 = structure.ElementFactory.CreateBeam(node4, node5, dynamicProperties);
        //    structure.LoadFactory.AddPointMovingLoad(-1000, 0, 1);
        //    structure.LoadFactory.AddPointMovingLoad(-2000, -4, 1);

        //    structure.Solve();
        //    var results = structure.Results.BeamResults;

        //    var beam1Result = results.GetResult(beam1, 1);
        //    var beam2Result = results.GetResult(beam2, 1);

        //}
    }
}
