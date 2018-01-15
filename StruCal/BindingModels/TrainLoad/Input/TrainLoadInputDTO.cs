using StruCal.BindingModels;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StruCal.BindingModels
{
    public class TrainLoadInputDTO
    {
        public string MaxColor { get; set; }
        public string MinColor { get; set; }
        public string MiddleColor { get; set; }
        public StructureGeometryDTO StructureGeometry { get; set; }
        public List<VertexInputDTO> Vertices { get; set; }
    }


    //public class Additional
    //{
    //    public Perimeter Perimeter { get; set; }
    //    public double Depth { get; set; }
    //}

}