﻿using Common.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.RCBeam
{
    /*public class DetailedResult
    {
        public LoadCase LoadCase { get; set; }
        public StringBuilder Text { get; set; }

        public static DetailedResult PrepareDetailedResults(LoadCaseResult calculationResult, Steel steel, Concrete concrete)
        {
            //symbole lacinskie

            double Ned = calculationResult.LoadCase.NormalForce;
            string epsilonSymbol = "\u03B5";
            string sigmaSymbol = "\u03C3";
            //string nl = Environment.NewLine;
            string sumSymbol = "\u03A3";


            double centreDistanceFromBottom = calculationResult.H - calculationResult.Cz;
            //List<string> text = new List<string>();
            StringBuilder text = new StringBuilder();


            text.AppendLine("Section:");
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "Section depth ", "H=" + calculationResult.H.ToFormatedString() + "m"));
            //text.AppendLine(nl);
            text.AppendLine("Centre of gravity from");
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "bottom fibre", "Zb=" + centreDistanceFromBottom.ToFormatedString() + "m"));
            //text.AppendLine(nl);
            text.AppendLine(string.Empty);
            //text.AppendLine(nl);
            text.AppendLine("Concrete properties:");
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "Grade", concrete.Grade));
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "Design strength", "fcd=" + (concrete.Fcd / 1000).ToFormatedString() + "MPa"));
            //text.AppendLine(nl);
            text.AppendLine(string.Empty);
            //text.AppendLine(nl);
            text.AppendLine("Steel properties:");
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "Grade", steel.Grade));
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "Yielding stress", "fyd=" + (steel.Fyd / 1000).ToFormatedString() + "MPa"));
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "Ultimate strain", epsilonSymbol + "ud=" + (steel.Eud * 100).ToFormatedString() + "%"));
            //text.AppendLine(nl);
            text.AppendLine(string.Empty);
            //text.AppendLine(nl);
            text.AppendLine("External loading:");
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "Axial force", "Ned=" + Ned.ToFormatedString() + "kNm"));
            //text.AppendLine(nl);
            text.AppendLine(string.Empty);
            //text.AppendLine(nl);
            text.AppendLine("Results:");
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "Section capacity", "Mrd=" + calculationResult.Mrd.ToFormatedString() + "kNm"));
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "Depth of compression zone", "x=" + (calculationResult.X * 100).ToFormatedString() + "cm"));
            //text.AppendLine(nl);
            text.AppendLine("Resultant of compression ");
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "zone", "FConcrete=" + calculationResult.ForceConcrete.ToFormatedString() + "kN"));
            //text.AppendLine(nl);
            text.AppendLine("(Moment is calculated about bottom fibre)");
            //text.AppendLine(nl);
            text.AppendLine("Moment of compression ");
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-30}{1,-10}", "zone", "MrdConcrete=" + calculationResult.MrdConcrete.ToFormatedString() + "kNm"));
            //text.AppendLine(nl);
            text.AppendLine(string.Empty);
            //text.AppendLine(nl);
            text.AppendLine("Detailed results for reinforcement:");
            //this.richTextBoxWyniki.AppendText(nl);// + "Lp [-]" + tab + "As [cm2]" + tab + "F [kN]" + tab + e + "[%]" + tab+s + "[MPa]"+tab+"Mz [kNm]");
            var str = String.Format("{0,-6}{1,10}{2,10}{3,10}{4,10}{5,10}", "Lp [-]", "As [cm2]", "F [kN]", epsilonSymbol + "[%]", sigmaSymbol + "[MPa]", "M [kNm]");
            //text.AppendLine(nl);
            text.AppendLine(str);
            //text.AppendLine(nl);

            double sumBarForce = 0;
            double sumBarMoment = 0;

            var reinforcementData = convertReinforcementDataToString(calculationResult.Bars, steel, ref sumBarForce, ref sumBarMoment);
            text.Append(reinforcementData.ToString());


            text.AppendLine(string.Format("{0,-40}{1,-10}", "Sum of forces in reinforcement", sumSymbol + "F=" + sumBarForce.ToFormatedString() + "kN"));
            //text.AppendLine(nl);
            text.AppendLine(string.Format("{0,-40}{1,-10}", "Sum of moments due to reinforcement", sumSymbol + "M=" + sumBarMoment.ToFormatedString() + "kNm"));
            //text.AppendLine(nl);



            double resultForce = calculationResult.ForceConcrete + sumBarForce - Ned;
            double resultMoment = calculationResult.MrdConcrete + sumBarMoment - Ned * centreDistanceFromBottom;


            text.AppendLine(string.Empty);
            //text.AppendLine(nl);
            text.AppendLine("Equilibrium in section:");
            //text.AppendLine(nl);
            text.AppendLine("Fconcrete+" + sumSymbol + "F-Ned=" + calculationResult.ForceConcrete.ToFormatedString() + "kN+" + sumBarForce.ToFormatedString() + "kN-" + Ned.ToFormatedString() + "kN=" + resultForce.ToFormatedString() + "kN");
            //text.AppendLine(nl);
            text.AppendLine(string.Empty);
            text.AppendLine("Moment about bottom fibre:");
            //text.AppendLine(nl);
            text.AppendLine("Mconcrete+" + sumSymbol + "M-Ned*Zb=" + calculationResult.MrdConcrete.ToFormatedString() + "kNm+" + sumBarMoment.ToFormatedString() + "kNm-" + Ned.ToFormatedString() + "kN*" + centreDistanceFromBottom.ToFormatedString() + "m=" + resultMoment.ToFormatedString() + "kNm");
            //text.AppendLine(nl);
            var result = new DetailedResult
            {
                LoadCase = calculationResult.LoadCase,
                Text = text
            };
            return result;
        }

        private static StringBuilder convertReinforcementDataToString(IEnumerable<Reinforcement> reinforcement, Steel steel, ref double sumForce, ref double sumMoment)
        {

            int i = 0;
            var result = new StringBuilder();
            foreach (var bar in reinforcement)
            {
                var multiplier = bar.IsCompressed ? 1 : -1;
                var strain = bar.Epsilon;
                var barArea = bar.Bar.As;
                var stress = multiplier * StressFunctions.SteelStressDesign(strain, steel);
                strain = strain * multiplier;
                var force = stress * barArea;
                var moment = multiplier * bar.Moment;
                sumForce = sumForce + force;
                sumMoment = sumMoment + moment;

                string str = String.Format("{0,-6}{1,10}{2,10}{3,10}{4,10}{5,10}", (i + 1).ToString(), (barArea * 10000).ToFormatedString(), force.ToFormatedString(), (strain * 100).ToFormatedString(), (stress / 1000).ToFormatedString(), moment.ToFormatedString());
                result.AppendLine(str);
                i++;
            }
            return result;
        }
    }*/
}
