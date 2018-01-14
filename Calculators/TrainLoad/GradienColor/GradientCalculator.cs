using Calculators.TrainLoad.GradienColor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad
{
    

    internal class GradientCalculator
    {
        private readonly Color maxColor;
        private readonly Color minColor;
        private readonly int range;

        public GradientCalculator(string maxColor, string minColor, int range = 10)
        {
            this.maxColor = Color.FromHexString(maxColor);
            this.minColor = Color.FromHexString(minColor);
            this.range = range;
        }


        public Color ColorAt(int index)
        {
            var rAverage = this.minColor.R + (int)((this.maxColor.R - this.minColor.R) * index / this.range);
            var gAverage = this.minColor.G + (int)((this.maxColor.G - this.minColor.G) * index / this.range);
            var bAverage = this.minColor.B + (int)((this.maxColor.B - this.minColor.B) * index / this.range);
            var result = Color.FromRGB(rAverage, gAverage, bAverage);
            return result;
        }
    }
}
