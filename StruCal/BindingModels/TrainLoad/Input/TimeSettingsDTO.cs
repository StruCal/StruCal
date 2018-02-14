using Calculators.TrainLoad.Input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StruCal.BindingModels.TrainLoad.Input
{
    public class TimeSettingsDTO
    {
        public double startTime { get; set; }
        public double endTime { get; set; }
        public double deltaTime { get; set; }
        public double deltaTimeResults { get; set; }
    }

    public static class ExtensionTimeSettingsDTO
    {
        public static TimeSettings ToTimeSettings(this TimeSettingsDTO timeSettingsDTO)
        {
            return new TimeSettings
            {
                DeltaTime = timeSettingsDTO.deltaTime,
                StartTime = timeSettingsDTO.startTime,
                EndTime = timeSettingsDTO.endTime,
                DeltaTimeResults = timeSettingsDTO.deltaTimeResults,
            };
        }

        public static TimeSettingsDTO ToTimeSettingsDTO(this TimeSettings timeSettings)
        {
            return new TimeSettingsDTO
            {
                deltaTime = timeSettings.DeltaTime,
                startTime = timeSettings.StartTime,
                endTime = timeSettings.EndTime,
                deltaTimeResults = timeSettings.DeltaTimeResults,
            };
        }

    }
}