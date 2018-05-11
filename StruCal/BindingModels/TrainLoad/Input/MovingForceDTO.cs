using Calculators.TrainLoad.Input;

namespace StruCal.BindingModels.TrainLoad.Input
{
    public class MovingForceDTO
    {
        public double basePosition { get; set; }
        public double load { get; set; }
    }

    public static class ExtensionMovingForceDTO
    {
        public static MovingForce ToMovingForce(this MovingForceDTO movingForceDTO)
        {
            return new MovingForce
            {
                BasePosition = movingForceDTO.basePosition,
                Load = movingForceDTO.load,
            };
        }
    }
}