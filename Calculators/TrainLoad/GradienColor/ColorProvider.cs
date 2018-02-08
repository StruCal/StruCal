using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.GradienColor
{
    public class ColorProvider
    {
        private readonly IGradient gradient;

        public ColorProvider(IGradient gradient)
        {
            this.gradient = gradient;
        }

        public string GetColor(double value, double max, double min)
        {
            var valueRange = max - min;
            var index = (int)(((value - min) / valueRange) * this.gradient.Range);

            var color = this.gradient.ColorAt(index).GetHexCodeHased();

            return color;
        }
    }
}
