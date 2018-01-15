using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.BindingModels
{
    public class TrainLoadOutputDTO
    {
        public double MaxAbsoluteDisplacement { get; set; }
        public IEnumerable<TimeResultDTO> TimeResults { get; set; }
    }
}
