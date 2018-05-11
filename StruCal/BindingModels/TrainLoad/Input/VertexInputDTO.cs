﻿using Calculators.TrainLoad;
using System.Collections.Generic;
using System.Linq;

namespace StruCal.BindingModels
{
    public class VertexInputDTO
    {
        public string barId { get; set; }
        public string meshId { get; set; }
        public List<Point3DDTO> vertices { get; set; }
    }

    public static class ExtensionVertexInputDTO
    {
        public static VertexInput ToVertexInput(this VertexInputDTO vertexInputDTO)
        {
            return new VertexInput
            {
                BarId = vertexInputDTO.barId,
                MeshId = vertexInputDTO.meshId,
                Vertices = vertexInputDTO.vertices.Select(e => e.ToPointD()).ToList(),
            };
        }
    }
}