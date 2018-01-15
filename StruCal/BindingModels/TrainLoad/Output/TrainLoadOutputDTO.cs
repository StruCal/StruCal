using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class TrainLoadOutputDTO
    {
        public double maxAbsoluteDisplacement { get; set; }
        public IEnumerable<TimeResultDTO> timeResults { get; set; }
    }
}
