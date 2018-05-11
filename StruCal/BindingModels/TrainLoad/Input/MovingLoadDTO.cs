using Calculators.TrainLoad.Input;
using System.Collections.Generic;
using System.Linq;

namespace StruCal.BindingModels.TrainLoad.Input
{
    public class MovingLoadDTO
    {
        public double speed { get; set; }
        public List<MovingForceDTO> forces { get; set; }
    }

    public static class ExtensionMovingLoadDTO
    {
        public static MovingLoad ToMovingLoad(this MovingLoadDTO movingLoadDTO)
        {
            return new MovingLoad
            {
                Speed = movingLoadDTO.speed,
                Forces = movingLoadDTO.forces.Select(e => e.ToMovingForce()).ToList()
            };
        }
    }
}