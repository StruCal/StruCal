using Calculators.TrainLoad.GradienColor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad
{
    
    public class LinearGradient : IGradient
    {
        private readonly Color maxColor;
        private readonly Color minColor;
        private readonly Color middleColor;
        public  int Range { get; }

        public LinearGradient(string maxColor, string minColor,string middleColor, int range = 10)
        {
            this.maxColor = Color.FromHexString(maxColor);
            this.minColor = Color.FromHexString(minColor);
            this.middleColor = Color.FromHexString(middleColor);
            this.Range = range;
        }


        public Color ColorAt(int index)
        {
            if (index < 0)
                index = 0;
            else if (index > this.Range)
                index = this.Range;

            var result = index < this.Range / 2 ? CalculateColor(this.minColor, this.middleColor, index) : CalculateColor(this.middleColor, this.maxColor, index);
            
            return result;
        }

        private Color CalculateColor(Color min, Color max, int index)
        {
            var rAverage = min.R + (int)((max.R - min.R) * index / this.Range);
            var gAverage = min.G + (int)((max.G - min.G) * index / this.Range);
            var bAverage = min.B + (int)((max.B - min.B) * index / this.Range);
            var result = Color.FromRGB(rAverage, gAverage, bAverage);
            return result;
        }
    }
}
