using Calculators.RCBeam;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StruCal.BindingModels
{
    public class RcBeamInput
    {
        public Concrete Concrete { get; set; }
        public Steel Steel { get; set; }
        public List<PointD> SectionCoordinates { get; set; }
        public List<Bar> Bars { get; set; }
        public List<LoadCase> LoadCases { get; set; }
    }
}