﻿using Calculators.TrainLoad.Output;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class VertexColorResultDTO
    {
        public Point3DDTO position { get; set; }
        public double displacement { get; set; }

        public string color { get; set; }
    }
    public static class ExtensionVertexColorResultDTO
    {
        
        public static VertexColorResultDTO ToVertexColorResultDTO(this VertexColorResult vertexColorResult)
        {
            return new VertexColorResultDTO
            {
                color = vertexColorResult.Color,
                displacement=vertexColorResult.Displacement,
                position = vertexColorResult.Position.ToPointDDTO(),
            };
        }
    }
}
