﻿using Calculators.TrainLoad;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calculators.TrainLoad
{
    public class TrainLoadInput
    {
        public string MaxColor { get; set; }
        public string MinColor { get; set; }
        public StructureGeometry StructureGeometry { get; set; }
        public List<VertexInput> Vertices { get; set; }
    }


    //public class Additional
    //{
    //    public Perimeter Perimeter { get; set; }
    //    public double Depth { get; set; }
    //}

}