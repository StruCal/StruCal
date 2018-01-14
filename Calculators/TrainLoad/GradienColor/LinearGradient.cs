using Calculators.TrainLoad.GradienColor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad
{
    
    internal class LinearGradient : IGradient
    {
        private readonly Color maxColor;
        private readonly Color minColor;
        public  int Range { get; }

        public LinearGradient(string maxColor, string minColor, int range = 10)
        {
            this.maxColor = Color.FromHexString(maxColor);
            this.minColor = Color.FromHexString(minColor);
            this.Range = range;
        }


        public Color ColorAt(int index)
        {
            var rAverage = this.minColor.R + (int)((this.maxColor.R - this.minColor.R) * index / this.Range);
            var gAverage = this.minColor.G + (int)((this.maxColor.G - this.minColor.G) * index / this.Range);
            var bAverage = this.minColor.B + (int)((this.maxColor.B - this.minColor.B) * index / this.Range);
            var result = Color.FromRGB(rAverage, gAverage, bAverage);
            return result;
        }
    }
}
