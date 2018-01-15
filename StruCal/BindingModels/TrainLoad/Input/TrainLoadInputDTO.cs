using StruCal.BindingModels;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Calculators.TrainLoad;

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
    public static class ExtensionTrainLoadInputDTO
    {
        public static TrainLoadInput ToTrainLoadInput(this TrainLoadInputDTO trainLoadInputDTO)
        {
            return new TrainLoadInput
            {
                MaxColor=trainLoadInputDTO.maxColor,
                MiddleColor=trainLoadInputDTO.middleColor,
                MinColor=trainLoadInputDTO.minColor,
                StructureGeometry=trainLoadInputDTO.structureGeometry.ToStructureGeometry(),
                Vertices=trainLoadInputDTO.vertices.Select(e=>e.ToVertexInput()).ToList(),
            };
        }
    }

    //public class Additional
    //{
    //    public Perimeter Perimeter { get; set; }
    //    public double Depth { get; set; }
    //}

}