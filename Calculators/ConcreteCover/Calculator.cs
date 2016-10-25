using Common.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.ConcreteCover
{
    public class Calculator
    {
        // Rebar properties
        public double RebarDiameter { get; set; }
        public ArrangementOfBars ArrangementOfBars { get; set; }

        // Concrete properties
        public ConcreteClass ConcreteClass { get; set; }
        public ExposureClass ExposureClass { get; set; }
        public StructuralClass BaseStructuralClass { get; set; }
        public bool NominalMaximumAggregateSizeIsGreaterThan32mm { get; set; }

        // Bond Requirement
        public double MinimumCoverDueToBondRequirement { get; set; }

        // EnvironmentalConditions
        public bool DesignWorkingLifeOf100Years { get; set; }
        public bool MemberWithSlabGeometry { get; set; }
        public bool SpecialQualityControlOfTheConcreteProductionEnsured { get; set; }
        public StructuralClass StructuralClass { get; set; }
        public double MinimumCoverDueToEnvironmentalConditions { get; set; }

        // Additive Safety Element
        public double AdditiveSafetyElement { get; set; }

        // Reduction Of Minimum Cover For Use Of Stainless Steel
        public double ReductionOfMinimumCoverForUseOfStainlessSteel { get; set; }

        // Reduction Of Minimum Cover For Use Of Additional Protection
        public double ReductionOfMinimumCoverForUseOfAdditionalProtection { get; set; }

        // Results
        public double MinimumCover { get; set; }
        public double AllowanceInDesignForDeviation { get; set; }
        public double NominalCover { get; set; }

        /// <summary>
        /// Calculate Minimum Cover Due To Bond Requirement based on PN-EN 1992-1-1 Table 4.2
        /// Symbol c_min,b
        /// </summary>
        /// <param name="arrangementOfBars"></param>
        public void CalculateMinimumCoverDueToBondRequirement()
        {
            switch (this.ArrangementOfBars)
            {
                case ArrangementOfBars.Bundled:
                    //TODO - do zaimplementowania
                    throw new Exception("Not implemented yet.");
                // case ArrangementOfBars.Separated
                default:
                    this.MinimumCoverDueToBondRequirement = this.RebarDiameter;
                    break;
            }

            if (NominalMaximumAggregateSizeIsGreaterThan32mm)
            {
                this.MinimumCoverDueToBondRequirement += 0.005d;
            }
        }

        /// <summary>
        /// Calculate Structural Class based on PN-EN 1992-1-1 Table 4.3N
        /// </summary>
        public void CalculateStructuralClass()
        {
            this.StructuralClass = this.BaseStructuralClass;

            // Check Exposure Class
            if (this.ExposureClass == ExposureClass.X0 || this.ExposureClass == ExposureClass.XC1 ||
                this.ExposureClass == ExposureClass.XC2 || this.ExposureClass == ExposureClass.XC3 ||
                this.ExposureClass == ExposureClass.XC4 || this.ExposureClass == ExposureClass.XD1 ||
                this.ExposureClass == ExposureClass.XD2 || this.ExposureClass == ExposureClass.XS1 ||
                this.ExposureClass == ExposureClass.XD3 || this.ExposureClass == ExposureClass.XS2 ||
                this.ExposureClass == ExposureClass.XS3
                )
            {
                // Modification based on Design Working Life of 100 years
                if (this.DesignWorkingLifeOf100Years)
                {
                    //this.StructuralClass = (StructuralClass)((int)StructuralClass + 2).Clamp((int)StructuralClass.S1, (int)StructuralClass.S6);
                    this.StructuralClass = (StructuralClass)((int)this.StructuralClass + 2);
                }

                // Modification based on Concrete Class and Exposure Class
                if ((this.ConcreteClass >= ConcreteClass.C30_37 && (this.ExposureClass == ExposureClass.X0 || this.ExposureClass == ExposureClass.XC1)) ||
                    (this.ConcreteClass >= ConcreteClass.C35_45 && (this.ExposureClass == ExposureClass.XC2 || this.ExposureClass == ExposureClass.XC3)) ||
                    (this.ConcreteClass >= ConcreteClass.C40_50 && (this.ExposureClass == ExposureClass.XC4 || this.ExposureClass == ExposureClass.XD1 || this.ExposureClass == ExposureClass.XD2 || this.ExposureClass == ExposureClass.XS1)) ||
                    (this.ConcreteClass >= ConcreteClass.C45_55 && (this.ExposureClass == ExposureClass.XD3 || this.ExposureClass == ExposureClass.XS2 || this.ExposureClass == ExposureClass.XS3)))
                {

                    //this.StructuralClass = (StructuralClass)((int)StructuralClass - 1).Clamp((int)StructuralClass.S1, (int)StructuralClass.S6);
                    this.StructuralClass = (StructuralClass)((int)this.StructuralClass - 1);
                }

                // Modification based on Member With Slab Geometry
                if (this.MemberWithSlabGeometry)
                {
                    //this.StructuralClass = (StructuralClass)((int)StructuralClass - 1).Clamp((int)StructuralClass.S1, (int)StructuralClass.S6);
                    this.StructuralClass = (StructuralClass)((int)this.StructuralClass - 1);
                }

                // Modification based on Member With Slab Geometry
                if (this.SpecialQualityControlOfTheConcreteProductionEnsured)
                {
                    //this.StructuralClass = (StructuralClass)((int)StructuralClass - 1).Clamp((int)StructuralClass.S1, (int)StructuralClass.S6);
                    this.StructuralClass = (StructuralClass)((int)this.StructuralClass - 1);
                }
            }

            this.StructuralClass = (StructuralClass)((int)this.StructuralClass).Clamp((int)StructuralClass.S1, (int)StructuralClass.S6);
        }

        /// <summary>
        /// Calculate Minimum Cover Due To Environmental Conditions for reinforcement steel based on PN-EN 1992-1-1 Table 4.4N
        /// Symbol c_min,dur
        /// </summary>
        public void CalculateMinimumCoverDueToEnvironmentalConditions()
        {
            // Exposure Class = X0
            if (this.ExposureClass == ExposureClass.X0)
            {
                if (this.StructuralClass == StructuralClass.S1 || this.StructuralClass == StructuralClass.S2 ||
                    this.StructuralClass == StructuralClass.S3 || this.StructuralClass == StructuralClass.S4)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.01d;
                }
                else if (this.StructuralClass == StructuralClass.S5)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.015d;
                }
                else if (this.StructuralClass == StructuralClass.S6)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.02d;
                }
            }

            // Exposure Class = XC1
            else if (this.ExposureClass == ExposureClass.XC1)
            {
                if (this.StructuralClass == StructuralClass.S1 || this.StructuralClass == StructuralClass.S2 ||
                    this.StructuralClass == StructuralClass.S3)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.01d;
                }
                else if (this.StructuralClass == StructuralClass.S4)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.015d;
                }
                else if (this.StructuralClass == StructuralClass.S5)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.02d;
                }
                else if (this.StructuralClass == StructuralClass.S6)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.025d;
                }
            }
            // Exposure Class = XC2 || XC3
            else if (this.ExposureClass == ExposureClass.XC2 || this.ExposureClass == ExposureClass.XC3)
            {
                if (this.StructuralClass == StructuralClass.S1)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.01d;
                }
                else if (this.StructuralClass == StructuralClass.S2)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.015d;
                }
                else if (this.StructuralClass == StructuralClass.S3)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.02d;
                }
                else if (this.StructuralClass == StructuralClass.S4)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.025d;
                }
                else if (this.StructuralClass == StructuralClass.S5)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.03d;
                }
                else if (this.StructuralClass == StructuralClass.S6)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.035d;
                }
            }
            // Exposure Class = XC4
            else if (this.ExposureClass == ExposureClass.XC4)
            {
                if (this.StructuralClass == StructuralClass.S1)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.015d;
                }
                else if (this.StructuralClass == StructuralClass.S2)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.02d;
                }
                else if (this.StructuralClass == StructuralClass.S3)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.025d;
                }
                else if (this.StructuralClass == StructuralClass.S4)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.03d;
                }
                else if (this.StructuralClass == StructuralClass.S5)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.035d;
                }
                else if (this.StructuralClass == StructuralClass.S6)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.04d;
                }
            }
            // Exposure Class = XD1 || XS1
            else if (this.ExposureClass == ExposureClass.XD1 || this.ExposureClass == ExposureClass.XS1)
            {
                if (this.StructuralClass == StructuralClass.S1)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.02d;
                }
                else if (this.StructuralClass == StructuralClass.S2)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.025d;
                }
                else if (this.StructuralClass == StructuralClass.S3)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.03d;
                }
                else if (this.StructuralClass == StructuralClass.S4)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.035d;
                }
                else if (this.StructuralClass == StructuralClass.S5)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.04d;
                }
                else if (this.StructuralClass == StructuralClass.S6)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.045d;
                }
            }
            // Exposure Class = XD2 || XS2
            else if (this.ExposureClass == ExposureClass.XD2 || this.ExposureClass == ExposureClass.XS2)
            {
                if (this.StructuralClass == StructuralClass.S1)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.025d;
                }
                else if (this.StructuralClass == StructuralClass.S2)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.03d;
                }
                else if (this.StructuralClass == StructuralClass.S3)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.035d;
                }
                else if (this.StructuralClass == StructuralClass.S4)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.04d;
                }
                else if (this.StructuralClass == StructuralClass.S5)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.045d;
                }
                else if (this.StructuralClass == StructuralClass.S6)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.05d;
                }
            }
            // Exposure Class = XD3 || XS3
            else if (this.ExposureClass == ExposureClass.XD3 || this.ExposureClass == ExposureClass.XS3)
            {
                if (this.StructuralClass == StructuralClass.S1)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.03d;
                }
                else if (this.StructuralClass == StructuralClass.S2)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.035d;
                }
                else if (this.StructuralClass == StructuralClass.S3)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.04d;
                }
                else if (this.StructuralClass == StructuralClass.S4)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.045d;
                }
                else if (this.StructuralClass == StructuralClass.S5)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.05d;
                }
                else if (this.StructuralClass == StructuralClass.S6)
                {
                    this.MinimumCoverDueToEnvironmentalConditions = 0.055d;
                }
            }
        }

        /// <summary>
        /// Calculate Nominal Concrete Cover based on PN-EN 1992-1-1 4.4.1.2 (4.2)
        /// Symbol c_min 
        /// </summary>
        public void CalculateMinimumCover()
        {
            this.MinimumCover = Math.Max(MinimumCoverDueToBondRequirement,
                Math.Max(MinimumCoverDueToEnvironmentalConditions + AdditiveSafetyElement - ReductionOfMinimumCoverForUseOfAdditionalProtection - ReductionOfMinimumCoverForUseOfStainlessSteel,
                0.01d));
        }

        /// <summary>
        /// Calculate Nominal Concrete Cover based on PN-EN 1992-1-1 4.4.1.1 (4.1)
        /// Symbol c_nom
        /// </summary>
        public void CalculateNominalConcreteCover()
        {
            CalculateStructuralClass();
            CalculateMinimumCoverDueToBondRequirement();
            CalculateMinimumCoverDueToEnvironmentalConditions();
            CalculateMinimumCover();
            this.NominalCover = this.MinimumCover + this.AllowanceInDesignForDeviation;
        }
    }

    public enum ArrangementOfBars
    {
        Separated = 1,
        Bundled
    }

    public enum ConcreteClass
    {
        C12_15 = 1,
        C16_20,
        C20_25,
        C25_30,
        C30_37,
        C35_45,
        C40_50,
        C45_55,
        C50_60,
        C55_67,
        C60_75,
        C70_80,
        C80_95,
        C90_105
    }

    public enum ExposureClass
    {
        X0 = 1,
        XC1,
        XC2,
        XC3,
        XC4,
        XD1,
        XD2,
        XD3,
        XS1,
        XS2,
        XS3,
        XF1,
        XF2,
        XF3,
        XF4,
        XA1,
        XA2,
        XA3
    }

    public enum StructuralClass
    {
        SN2 = -3,
        SN1,
        S0 = 0,
        S1 = 1,
        S2,
        S3,
        S4,
        S5,
        S6,
        S7,
        S8
    }
}
