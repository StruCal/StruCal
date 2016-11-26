using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.ShearReinforcement
{
    public class ShearReinforcementInput
    {
        //all values accordint to EN-1992-2
        //all units in [mm] and [N]
        public double fck { get; set; }
        public double Ned { get; set; }
        public double gammaC { get; set; }
        public double bw { get; set; }
        public double d { get; set; }
        public double Asl { get; set; }
        public double h { get; set; }
        public double k1 { get; set; }
    }
    public class ShearReinforcementOutput
    {
        public double Vrdc1 { get; set; }
        public double Vrdc2 { get; set; }
        public double Vrdc { get; set; }
        public double Crdc { get; set; }
        public double sigmacp { get; set; }
        public double vmin { get; set; }
        public double fcd { get; set; }
        public double ro1 { get; set; }
        public double k1 { get; set; }
        public double k { get; set; }
    }

    public class ShearReinforcementCalculator
    {
        //members not requiring design shear reinforcement
        public ShearReinforcementOutput CalculateShearReinforcement(ShearReinforcementInput inputData)
        {
            var k1 = 0.15;//according to code
            var k = Math.Max(1 + Math.Sqrt(200 / inputData.d), 2d);
            var ro1 = inputData.Asl / (inputData.bw * inputData.d);
            var sigmacp = inputData.Ned / (inputData.h * inputData.bw);
            var Crdc = 0.18 / inputData.gammaC;
            var vmin = 0.035 * Math.Pow(k, 2 / 3) * Math.Sqrt(inputData.fck);
            var VRdc1 = (Crdc * k * Math.Pow(100 * ro1 * inputData.fck, 1 / 3) + k1 * sigmacp) * inputData.bw * inputData.d;
            var VRdc2 = (vmin + k1 * sigmacp) * inputData.bw * inputData.d;
            var Vrdc = Math.Min(VRdc1, VRdc2);
            var fcd = inputData.fck / inputData.gammaC;

            var shearReinforcement = new ShearReinforcementOutput
            {
                k1 = k1,
                k = k,
                ro1 = ro1,
                sigmacp = sigmacp,
                Crdc = Crdc,
                vmin = vmin,
                Vrdc1 = VRdc1,
                Vrdc2 = VRdc2,
                Vrdc = Vrdc,
                fcd = fcd,
            };

            return shearReinforcement;
        }
    }
}
