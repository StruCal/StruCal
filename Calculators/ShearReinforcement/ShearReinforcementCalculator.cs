using Common.Extensions;
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
        public double Ved { get; set; }
        public double fck { get; set; }
        public double Ned { get; set; }
        public double gammaC { get; set; }
        public double bw { get; set; }
        public double d { get; set; }
        public double Asl { get; set; }
        public double h { get; set; }
        public double k1 { get; set; }

        public double cotThetaMax { get; set; }
        public double cotThetaMin { get; set; }
        public double fywk { get; set; }
        public double gammaS { get; set; }
        public double Asw { get; set; }
        public double s { get; set; }

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
        public double k { get; set; }

        public double theta { get; set; }
        public double fywd { get; set; }
        public double cotTheta { get; set; }
        public double tanTheta { get; set; }
        public double z { get; set; }
        public double v1 { get; set; }
        public double alfaCw { get; set; }
        public double Vrds { get; set; }
        public double Vrdmax { get; set; }
        public bool ChangeSection { get; set; }
    }

    public class ShearReinforcementCalculator
    {
        //members not requiring design shear reinforcement
        public ShearReinforcementOutput CalculateShearReinforcement(ShearReinforcementInput inputData)
        {
            var k1 = inputData.k1;
            var k = Math.Min(1 + Math.Sqrt(200 / inputData.d), 2d);
            var ro1 = inputData.Asl / (inputData.bw * inputData.d);
            var sigmacp = inputData.Ned / (inputData.h * inputData.bw);
            var Crdc = 0.18 / inputData.gammaC;
            var vmin = 0.035 * Math.Pow(k, 3 / 2) * Math.Sqrt(inputData.fck);
            var VRdc1 = (Crdc * k * Math.Pow(100 * ro1 * inputData.fck, 1 / 3) + k1 * sigmacp) * inputData.bw * inputData.d;
            var VRdc2 = (vmin + k1 * sigmacp) * inputData.bw * inputData.d;
            var Vrdc = Math.Max(VRdc1, VRdc2);
            var fcd = inputData.fck / inputData.gammaC;


            var v1 = 0.6 * (1 - inputData.fck / 250);
            var z = 0.9 * inputData.d;
            var alfaCw = getAlfaCw(fcd, sigmacp);
            var fywd = inputData.fywk / inputData.gammaS;
            var theta = 0.5 * Math.Asin((2 * inputData.Ved) / (alfaCw * inputData.bw * z * v1 * fcd));
            var changeSection = false;
            var cotTheta = 0.0;
            var tanTheta = 0.0;
            var Vrdmax = 0.0;
            var Vrds = 0.0;
            if (theta.IsNaN())
            {
                //concrete strut fails
                changeSection = true;
            }
            else
            {
                changeSection = false;
                tanTheta = Math.Tan(theta);
                cotTheta = Math.Pow(tanTheta, -1);
                cotTheta = cotTheta >= inputData.cotThetaMax ? inputData.cotThetaMax : cotTheta;
                tanTheta = Math.Pow(cotTheta, -1);
                Vrdmax = alfaCw * inputData.bw * z * v1 * fcd / (tanTheta + cotTheta);
                Vrds = (inputData.Asw / inputData.s) * z * fywd * cotTheta;
            }

            var shearReinforcement = new ShearReinforcementOutput
            {
                k = k.Round(),
                ro1 = ro1.Round(),
                sigmacp = sigmacp.Round(),
                Crdc = Crdc.Round(),
                vmin = vmin.Round(),
                Vrdc1 = VRdc1.Round(),
                Vrdc2 = VRdc2.Round(),
                Vrdc = Vrdc.Round(),
                fcd = fcd.Round(),

                v1= v1.Round(),
                z= z.Round(),
                alfaCw=alfaCw.Round(),
                fywd= fywd.Round(),
                cotTheta= cotTheta.Round(),
                tanTheta=tanTheta.Round(),
                ChangeSection= changeSection,
                theta= theta.Round(),
                Vrdmax= Vrdmax.Round(),
                Vrds= Vrds.Round(),
            };

            return shearReinforcement;
        }

        private double getAlfaCw(double fcd,double sigmaCp)
        {
            var result = 0.0;
            if (sigmaCp <= 0.25 * fcd)
                result = 1 + sigmaCp / fcd;
            else if (0.25 * fcd < sigmaCp && sigmaCp <= 0.5 * fcd)
                result = 1.25;
            else if (0.5 * fcd < sigmaCp && sigmaCp <= fcd)
                result = 2.5 * (1 - sigmaCp / fcd);

            return result;
        }
    }
}
