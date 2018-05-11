using Calculators.TrainLoad;

namespace StruCal.BindingModels
{
    public class SupportDTO
    {
        public Point3DDTO location { get; set; }
        public string direction { get; set; }
    }

    public static class ExtensionSupportDTO
    {
        public static Support ToSupport(this SupportDTO supportDTO)
        {
            return new Support
            {
                Direction = supportDTO.direction,
                Location = supportDTO.location.ToPointD(),
            };
        }
    }
}