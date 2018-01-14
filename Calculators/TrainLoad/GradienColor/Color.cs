using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.GradienColor
{
    internal class Color
    {
        const int hex = 16;

        public int R { get; private set;}
        public int G { get; private set;}
        public int B { get; private set; }

        private Color()
        {
           
        }

        public string GetHexCode()
        {
            var r = this.R.ToString("X");
            var g = this.G.ToString("X");
            var b = this.B.ToString("X");
            var result = r + g + b;
            return result;
        }

        public string GetHexCodeHased()
        {
            return "#" + this.GetHexCode();
        }

        public static Color FromRGB(int r, int g, int b)
        {
            var color = new Color();
            color.R = r;
            color.G = g;
            color.B = b;
            return color;
        }

        public static Color FromHexString(string colorNumber)
        {
            var color = new Color();
            var colorTrimmed = colorNumber.Trim('#');
            color.R = Convert.ToInt32(colorTrimmed.Substring(0, 2), hex);
            color.G = Convert.ToInt32(colorTrimmed.Substring(2, 2), hex);
            color.B = Convert.ToInt32(colorTrimmed.Substring(4, 2), hex);
            return color;
        }
    }
}
