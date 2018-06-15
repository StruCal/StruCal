using Calculators.TrainLoad.Output;
using Common.Utils;
using Newtonsoft.Json;
using StruCal.BindingModels.TrainLoad.Input;
using System.Collections.Generic;
using System.Linq;

namespace StruCal.BindingModels
{
    public class TrainLoadOutputDTO
    {
        public static TrainLoadOutputDTO FromZip(byte[] bytes) => JsonConvert.DeserializeObject<TrainLoadOutputDTO>(ZipTools.DecompressToString(bytes));

        public double maxAbsoluteDisplacement { get; set; }
        public IEnumerable<TimeResultDTO> timeResults { get; set; }
        public TimeSettingsDTO timeSettings { get; set; }

        public byte[] Zip() => ZipTools.Compress(JsonConvert.SerializeObject(this));
    }

    public static class ExtensionTrainLoadOutputDTO
    {
        public static TrainLoadOutputDTO ToTrainLoadOutputDTO(this TrainLoadOutput trainLoadOutput)
        {
            return new TrainLoadOutputDTO
            {
                maxAbsoluteDisplacement = trainLoadOutput.MaxAbsoluteDisplacement,
                timeResults = trainLoadOutput.TimeResults.Select(e => e.ToTimeResultDTO()).ToList(),
                timeSettings = trainLoadOutput.TimeSettings.ToTimeSettingsDTO(),
            };
        }
    }
}