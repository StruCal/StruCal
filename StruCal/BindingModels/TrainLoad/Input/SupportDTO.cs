﻿using Calculators.TrainLoad;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class SupportDTO
    {
        public Point3DDTO location { get; set; }
        public string direction { get; set; }
    }
    public static class ExtensionSupportDTO
    {
        public static Support ToSupport(this SupportDTO supportDTO)
        {
            return new Support
            {
                Direction = supportDTO.direction,
                Location = supportDTO.location.ToPointD(),
            };
        }
    }
}
