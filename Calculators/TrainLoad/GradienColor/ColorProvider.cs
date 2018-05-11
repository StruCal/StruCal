namespace Calculators.TrainLoad.GradienColor
{
    public class ColorProvider
    {
        private readonly IGradient gradient;
        private readonly double max;
        private readonly double min;

        public ColorProvider(IGradient gradient, double max, double min)
        {
            this.gradient = gradient;
            this.max = max;
            this.min = min;
        }

        public string GetColor(double value)
        {
            var valueRange = max - min;
            var index = (int)(((value - min) / valueRange) * this.gradient.Range);

            var color = this.gradient.ColorAt(index).GetHexCodeHased();

            return color;
        }
    }
}