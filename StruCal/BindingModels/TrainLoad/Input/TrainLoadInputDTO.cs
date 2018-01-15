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
        public string maxColor { get; set; }
        public string minColor { get; set; }
        public string middleColor { get; set; }
        public StructureGeometryDTO structureGeometry { get; set; }
        public List<VertexInputDTO> vertices { get; set; }
    }


    //public class Additional
    //{
    //    public Perimeter Perimeter { get; set; }
    //    public double Depth { get; set; }
    //}

}