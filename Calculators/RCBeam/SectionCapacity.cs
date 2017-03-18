using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.RCBeam
{
    public class SectionCapacity
    {
        private ICompressionZoneCalculations compressionZoneCalculations;
        private IStrainCalculations strainCalculations;
        private IList<Reinforcement> reinforcement;
        private Concrete concrete;
        private Steel steel;
        private Section section;
        private double nEd;
        public SectionCapacity(Concrete concrete, Steel steel)
        {
            this.concrete = concrete;
            this.steel = steel;
        }
        private double calculateEffectiveDepthOfSectionAndBars()
        {
            /*Reinforcement barsTemp;
            double[] tab = new double[this.bars.Count];
            for (int i = 0; i <= this.bars.Count - 1; i++)
            {
                barsTemp = this.bars[i];
                barsTemp.D = this.section.MaxY - this.bars[i].Y;
                this.bars[i] = barsTemp;
                tab[i] = barsTemp.D;
            }*/
            var tempD = new List<double>();
            foreach (var bar in this.reinforcement)
            {
                double d = section.MaxY - bar.Bar.Y;
                tempD.Add(d);
                bar.D = d;
            }
            return tempD.Max();
        }
        private double equlibriumEquation(double x)
        {
            var forceInConcrete = this.forceInConcrete(x);
            var forceInAs1 = this.forceInAs1(x);
            var forceInAs2 = this.forceInAs2(x);
            var result = forceInConcrete + forceInAs2 - forceInAs1 - this.nEd;
            return result;
        }
        private double forceInAs1(double x)
        {
            var resultantForce = 0d;
            var yNeutralAxis = this.section.MaxY - x;
            for (int i = 0; i <= this.reinforcement.Count - 1; i++)
            {
                if (this.reinforcement[i].Bar.Y < yNeutralAxis)
                {
                    var di = this.reinforcement[i].D;
                    var e = this.strainCalculations.StrainInAs1(x, di);
                    resultantForce = resultantForce + this.reinforcement[i].Bar.As * StressFunctions.SteelStressDesign(e, this.steel);
                    var barsTemp = this.reinforcement[i];
                    barsTemp.Epsilon = e;
                    barsTemp.IsCompressed = false;
                    this.reinforcement[i] = barsTemp;
                }
            }
            return resultantForce;
        }
        private double forceInAs2(double x)
        {
            var resultantForce = 0d;
            var yNeutralAxis = this.section.MaxY - x;
            for (int i = 0; i <= this.reinforcement.Count - 1; i++)
            {
                if (this.reinforcement[i].Bar.Y > yNeutralAxis)
                {
                    var di = this.reinforcement[i].D;
                    var e = this.strainCalculations.StrainInAs2(x, di);
                    resultantForce = resultantForce + this.reinforcement[i].Bar.As * StressFunctions.SteelStressDesign(e, this.steel);
                    var barsTemp = this.reinforcement[i];
                    barsTemp.Epsilon = e;
                    barsTemp.IsCompressed = true;
                    this.reinforcement[i] = barsTemp;
                }
            }
            return resultantForce;
        }
        private double forceInConcrete(double x)
        {
            var result = this.compressionZoneCalculations.Calculate(x, this.section);
            return result.NormalForce;
        }
        private double solveEqulibriumEquation()
        {
            var EPS = 0.00000000001;
            var xL = 0.000001 * this.section.H;
            var xR = 10 * this.section.H;
            var xM = (xL + xR) / 2;
            double x0, fL, fR, fM;
            var k = 0;
            while ((Math.Abs(xL - xR) > EPS) && (k < 10000))
            {
                k++;
                xM = (xR + xL) / 2;
                fL = this.equlibriumEquation(xL);
                fR = this.equlibriumEquation(xR);
                fM = this.equlibriumEquation(xM);
                if (fL * fM < 0)
                {
                    xR = xM;
                }
                if (fR * fM < 0)
                {
                    xL = xM;
                }
            }
            if (k > 1000)
            {
                x0 = double.NaN;
            }
            else
            {
                x0 = (xR + xL) / 2;
            }
            return x0;
        }
        public LoadCaseResult CalculateCapacity(double nEd, Section section, IList<Bar> bars)
        {
            this.section = section;
            this.strainCalculations = new StrainCalculations(this.concrete, this.steel, section);

            if (this.concrete.N == 2d)
                this.compressionZoneCalculations = new CompressionZoneCalculationsGreenFormula(this.concrete, this.strainCalculations);
            else
                this.compressionZoneCalculations = new CompressionZoneCalculationsNumericalFormula(this.concrete, this.strainCalculations);

            createReinforcement(bars);
            this.section.D = this.calculateEffectiveDepthOfSectionAndBars();
            this.nEd = nEd;
            var result = new LoadCaseResult();
            result.D = this.section.D;
            result.X = this.solveEqulibriumEquation();
            if (double.IsNaN(result.X))
            {
                return result;
            }
            var forces = this.compressionZoneCalculations.Calculate(result.X, this.section);
            result.MrdConcrete = forces.Moment;
            result.ForceConcrete = forces.NormalForce;
            result.Mrd = mrdReinforcement(result.X) + result.MrdConcrete - this.nEd * (this.section.H - this.section.Cz);
            result.CompressionZone = CompressionZoneCoordinates.CoordinatesOfCompressionZone(this.section.Coordinates, this.section.MaxY - result.X);
            result.Bars = this.reinforcement;
            result.Ec = this.strainCalculations.StrainInConcrete(result.X, 0);
            //result.H = section.H;
            //result.Cz = section.Cz;
            return result;
        }
        private void createReinforcement(IList<Bar> bars)
        {
            this.reinforcement = new List<Reinforcement>();
            foreach (var bar in bars)
            {
                this.reinforcement.Add(new Reinforcement() { Bar = bar });
            }
        }
        private double mrdReinforcement(double x)
        {
            var Mrd = 0d;
            var yOsi = this.section.MaxY - x;
            Reinforcement barsTemp;
            for (int i = 0; i <= this.reinforcement.Count - 1; i++)
            {
                barsTemp = this.reinforcement[i];

                barsTemp.Sigma =  StressFunctions.SteelStressDesign(barsTemp.Epsilon, this.steel);
                barsTemp.Force = barsTemp.Bar.As * barsTemp.Sigma;
                barsTemp.Moment = barsTemp.Force * (reinforcement[i].Bar.Y - this.section.MinY);
                if (this.reinforcement[i].Bar.Y > yOsi)
                {
                    Mrd = Mrd + barsTemp.Moment ;
                }
                else
                {
                    Mrd = Mrd - barsTemp.Moment;
                }
                this.reinforcement[i] = barsTemp;
            }
            return Mrd;
        }
    }
}
