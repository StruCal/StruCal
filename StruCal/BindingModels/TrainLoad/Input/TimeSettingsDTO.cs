using Calculators.TrainLoad.Input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StruCal.BindingModels.TrainLoad.Input
{
    public class TimeSettingsDTO
    {
        public double StartTime { get; set; }
        public double EndTime { get; set; }
        public double DeltaTime { get; set; }
    }

    public static class ExtensionTimeSettingsDTO
    {
        public static TimeSettings ToTimeSettings(this TimeSettingsDTO timeSettingsDTO)
        {
            return new TimeSettings
            {
                DeltaTime=timeSettingsDTO.DeltaTime,
                StartTime=timeSettingsDTO.StartTime,
                EndTime=timeSettingsDTO.EndTime,
            };
        }
    }
}