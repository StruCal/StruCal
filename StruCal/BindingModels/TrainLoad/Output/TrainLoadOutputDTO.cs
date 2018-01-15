using Calculators.TrainLoad.Output;
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

    public static class ExtensionTrainLoadOutputDTO
    {
        public static TrainLoadOutputDTO ToTrainLoadOutputDTO(this TrainLoadOutput trainLoadOutput)
        {
            return new TrainLoadOutputDTO
            {
                maxAbsoluteDisplacement = trainLoadOutput.MaxAbsoluteDisplacement,
                timeResults = trainLoadOutput.TimeResults.Select(e => e.ToTimeResultDTO()).ToList(),
                
            };
        }
    }
}
