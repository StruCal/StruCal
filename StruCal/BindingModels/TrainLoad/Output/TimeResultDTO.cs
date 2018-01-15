using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class TimeResultDTO
    {
        public double Time { get; set; }
        public double MaxStress { get; set; }
        public double MinStress { get; set; }
        public IEnumerable<MeshColorResultDTO> MeshResults { get; set; }
    }
}
