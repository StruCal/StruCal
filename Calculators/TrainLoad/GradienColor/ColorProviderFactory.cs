namespace Calculators.TrainLoad.GradienColor
{
    public class ColorProviderFactory
    {
        private readonly IGradient gradient;

        public ColorProviderFactory(IGradient gradient)
        {
            this.gradient = gradient;
        }

        public ColorProvider GetColorProvider(double max, double min)
        {
            return new ColorProvider(this.gradient, max, min);
        }
    }
}