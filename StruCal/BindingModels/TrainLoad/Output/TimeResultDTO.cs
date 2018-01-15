using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class TimeResultDTO
    {
        public double time { get; set; }
        public double maxStress { get; set; }
        public double minStress { get; set; }
        public IEnumerable<MeshColorResultDTO> meshResults { get; set; }
    }
}
