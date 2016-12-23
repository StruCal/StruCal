using Common.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.ConcreteCover
{
    public class ConcreteCoverInput
    {
        // Rebar properties
        public string RebarDiameter { get; set; }
        public string ArrangementOfBars { get; set; }

        // Concrete properties
        public string ConcreteClass { get; set; }
        public string ExposureClass { get; set; }
        public string BaseStructuralClass { get; set; }
        public bool NominalMaximumAggregateSizeIsGreaterThan32mm { get; set; }

        // EnvironmentalConditions
        public bool DesignWorkingLifeOf100Years { get; set; }
        public bool MemberWithSlabGeometry { get; set; }
        public bool SpecialQualityControlOfTheConcreteProductionEnsured { get; set; }

        // Additive Safety Element
        public double AdditiveSafetyElement { get; set; }

        // Reduction Of Minimum Cover For Use Of Stainless Steel
        public double ReductionOfMinimumCoverForUseOfStainlessSteel { get; set; }

        // Reduction Of Minimum Cover For Use Of Additional Protection
        public double ReductionOfMinimumCoverForUseOfAdditionalProtection { get; set; }

        // Allowance in design for deviation
        public double AllowanceInDesignForDeviation { get; set; }
    }

    public class ConcreteCoverOutput
    {
        public string StructuralClass { get; set; }
        public double MinimumCoverDueToBondRequirement { get; set; }
        public double MinimumCoverDueToEnvironmentalConditions { get; set; }
        public double MinimumCover { get; set; }
        public double NominalCover { get; set; }
    }

    public class ConcreteCoverCalculator
    {
        public ConcreteCoverInput inputData { get; set; }
        public ConcreteCoverOutput outputData { get; set; }

        public ConcreteCoverCalculator()
        {
            outputData = new ConcreteCoverOutput();
        }

        /// <summary>
        /// Calculate Minimum Cover Due To Bond Requirement based on PN-EN 1992-1-1 Table 4.2
        /// Symbol c_min,b
        /// </summary>
        /// <param name="arrangementOfBars"></param>
        public ConcreteCoverOutput CalculateMinimumCoverDueToBondRequirement(ConcreteCoverInput inputData)
        {
            this.inputData = inputData;

            switch (ConvertStringToArrangementOfBars(this.inputData.ArrangementOfBars))
            {
                case ArrangementOfBars.Bundled:
                    //TODO - do zaimplementowania
                    throw new Exception("Not implemented yet.");
                // case ArrangementOfBars.Separated
                default:
                    this.outputData.MinimumCoverDueToBondRequirement = ConvertStringToRebarDiameter(this.inputData.RebarDiameter);
                    break;
            }

            if (this.inputData.NominalMaximumAggregateSizeIsGreaterThan32mm)
            {
                this.outputData.MinimumCoverDueToBondRequirement += 0.005d;
            }

            return this.outputData;
        }

        /// <summary>
        /// Calculate Structural Class based on PN-EN 1992-1-1 Table 4.3N
        /// </summary>
        public ConcreteCoverOutput CalculateStructuralClass(ConcreteCoverInput inputData)
        {
            this.inputData = inputData;

            ExposureClass exposureClass = ConvertStringToExposureClass(this.inputData.ExposureClass);
            ConcreteClass concreteClass = ConvertStringToConcreteClass(this.inputData.ConcreteClass);
            this.outputData.StructuralClass = this.inputData.BaseStructuralClass;

            // Check Exposure Class
            if (exposureClass == ExposureClass.X0 ||  exposureClass == ExposureClass.XC1 ||
                exposureClass == ExposureClass.XC2 || exposureClass == ExposureClass.XC3 ||
                exposureClass == ExposureClass.XC4 || exposureClass == ExposureClass.XD1 ||
                exposureClass == ExposureClass.XD2 || exposureClass == ExposureClass.XS1 ||
                exposureClass == ExposureClass.XD3 || exposureClass == ExposureClass.XS2 ||
                exposureClass == ExposureClass.XS3
                )
            {
                // Modification based on Design Working Life of 100 years
                if (this.inputData.DesignWorkingLifeOf100Years)
                {
                    //this.StructuralClass = (StructuralClass)((int)StructuralClass + 2).Clamp((int)StructuralClass.S1, (int)StructuralClass.S6);
                    this.outputData.StructuralClass = ((int)ConvertStringToStructuralClass(this.outputData.StructuralClass) + 2).ToString();
                }

                // Modification based on Concrete Class and Exposure Class
                if ((concreteClass >= ConcreteClass.C30_37 && (exposureClass == ExposureClass.X0 ||  exposureClass == ExposureClass.XC1)) ||
                    (concreteClass >= ConcreteClass.C35_45 && (exposureClass == ExposureClass.XC2 || exposureClass == ExposureClass.XC3)) ||
                    (concreteClass >= ConcreteClass.C40_50 && (exposureClass == ExposureClass.XC4 || exposureClass == ExposureClass.XD1 || exposureClass == ExposureClass.XD2 || exposureClass == ExposureClass.XS1)) ||
                    (concreteClass >= ConcreteClass.C45_55 && (exposureClass == ExposureClass.XD3 || exposureClass == ExposureClass.XS2 || exposureClass == ExposureClass.XS3)))
                {

                    //this.StructuralClass = (StructuralClass)((int)StructuralClass - 1).Clamp((int)StructuralClass.S1, (int)StructuralClass.S6);
                    this.outputData.StructuralClass = ((int)ConvertStringToStructuralClass(this.outputData.StructuralClass) - 1).ToString();
                }

                // Modification based on Member With Slab Geometry
                if (this.inputData.MemberWithSlabGeometry)
                {
                    //this.StructuralClass = (StructuralClass)((int)StructuralClass - 1).Clamp((int)StructuralClass.S1, (int)StructuralClass.S6);
                    this.outputData.StructuralClass = ((int)ConvertStringToStructuralClass(this.outputData.StructuralClass) - 1).ToString();
                }

                // Modification based on Member With Slab Geometry
                if (this.inputData.SpecialQualityControlOfTheConcreteProductionEnsured)
                {
                    //this.StructuralClass = (StructuralClass)((int)StructuralClass - 1).Clamp((int)StructuralClass.S1, (int)StructuralClass.S6);
                    this.outputData.StructuralClass = ((int)ConvertStringToStructuralClass(this.outputData.StructuralClass) - 1).ToString();
                }
            }

            this.outputData.StructuralClass = ((int)ConvertStringToStructuralClass(this.outputData.StructuralClass)).Clamp((int)StructuralClass.S1, (int)StructuralClass.S6).ToString();

            return this.outputData;
        }

        /// <summary>
        /// Calculate Minimum Cover Due To Environmental Conditions for reinforcement steel based on PN-EN 1992-1-1 Table 4.4N
        /// Symbol c_min,dur
        /// </summary>
        public ConcreteCoverOutput CalculateMinimumCoverDueToEnvironmentalConditions(ConcreteCoverInput inputData)
        {
            this.inputData = inputData;

            // Exposure Class = X0
            if (ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.X0)
            {
                if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S1 || ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S2 ||
                    ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S3 || ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S4)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.01d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S5)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.015d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S6)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.02d;
                }
            }

            // Exposure Class = XC1
            else if (ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.XC1)
            {
                if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S1 || ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S2 ||
                    ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S3)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.01d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S4)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.015d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S5)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.02d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S6)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.025d;
                }
            }
            // Exposure Class = XC2 || XC3
            else if (ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.XC2 || ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.XC3)
            {
                if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S1)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.01d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S2)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.015d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S3)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.02d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S4)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.025d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S5)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.03d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S6)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.035d;
                }
            }
            // Exposure Class = XC4
            else if (ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.XC4)
            {
                if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S1)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.015d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S2)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.02d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S3)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.025d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S4)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.03d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S5)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.035d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S6)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.04d;
                }
            }
            // Exposure Class = XD1 || XS1
            else if (ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.XD1 || ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.XS1)
            {
                if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S1)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.02d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S2)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.025d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S3)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.03d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S4)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.035d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S5)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.04d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S6)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.045d;
                }
            }
            // Exposure Class = XD2 || XS2
            else if (ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.XD2 || ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.XS2)
            {
                if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S1)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.025d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S2)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.03d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S3)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.035d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S4)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.04d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S5)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.045d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S6)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.05d;
                }
            }
            // Exposure Class = XD3 || XS3
            else if (ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.XD3 || ConvertStringToExposureClass(this.inputData.ExposureClass) == ExposureClass.XS3)
            {
                if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S1)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.03d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S2)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.035d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S3)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.04d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S4)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.045d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S5)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.05d;
                }
                else if (ConvertStringToStructuralClass(this.outputData.StructuralClass) == StructuralClass.S6)
                {
                    this.outputData.MinimumCoverDueToEnvironmentalConditions = 0.055d;
                }
            }

            return this.outputData;
        }

        /// <summary>
        /// Calculate Nominal Concrete Cover based on PN-EN 1992-1-1 4.4.1.2 (4.2)
        /// Symbol c_min 
        /// </summary>
        public ConcreteCoverOutput CalculateMinimumCover(ConcreteCoverInput inputData)
        {
            this.inputData = inputData;

            this.outputData.MinimumCover = Math.Max(this.outputData.MinimumCoverDueToBondRequirement,
                Math.Max(this.outputData.MinimumCoverDueToEnvironmentalConditions + this.inputData.AdditiveSafetyElement - this.inputData.ReductionOfMinimumCoverForUseOfAdditionalProtection - this.inputData.ReductionOfMinimumCoverForUseOfStainlessSteel,
                0.01d));

            return this.outputData;
        }

        /// <summary>
        /// Calculate Nominal Concrete Cover based on PN-EN 1992-1-1 4.4.1.1 (4.1)
        /// Symbol c_nom
        /// </summary>
        public ConcreteCoverOutput CalculateNominalConcreteCover(ConcreteCoverInput inputData)
        {
            this.inputData = inputData;

            CalculateStructuralClass(inputData);
            CalculateMinimumCoverDueToBondRequirement(inputData);
            CalculateMinimumCoverDueToEnvironmentalConditions(inputData);
            CalculateMinimumCover(inputData);
            this.outputData.NominalCover = this.outputData.MinimumCover + this.inputData.AllowanceInDesignForDeviation;

            return this.outputData;
        }

        #region Converters
        /// <summary>
        /// Converts rebar diameter as String to double.
        /// </summary>
        /// <param name="rebarString"></param>
        /// <returns></returns>
        public static double ConvertStringToRebarDiameter(string rebarString)
        {
            int index = rebarString.IndexOf(" ");
            if (index > 0) rebarString = rebarString.Substring(0, index);

            return double.Parse(rebarString) / 1000d;
        }

        /// <summary>
        /// Converts ArrangementOfBars to string
        /// </summary>
        /// <param name="arrangementOfBars"></param>
        /// <returns></returns>
        public static string ConvertArrangementOfBarsToString(ArrangementOfBars arrangementOfBars)
        {
            return arrangementOfBars.ToString();
        }

        /// <summary>
        /// Converts arrangement of bars as String to enum.
        /// </summary>
        /// <param name="arrangementOfBarsString"></param>
        /// <returns></returns>
        public static ArrangementOfBars ConvertStringToArrangementOfBars(string arrangementOfBarsString)
        {
            return (ArrangementOfBars)Enum.Parse(typeof(ArrangementOfBars), arrangementOfBarsString);
        }

        /// <summary>
        /// Converts '_' to '/' for visual purposes of concrete class DropdownList.
        /// </summary>
        /// <param name="concreteClass"></param>
        /// <returns></returns>
        public static string ConvertConcreteClassToString(string concreteClass)
        {
            return concreteClass.ToString().Replace("_", "/");
        }

        /// <summary>
        /// Converts '_' to '/' for visual purposes of concrete class DropdownList.
        /// </summary>
        /// <param name="concreteClass"></param>
        /// <returns></returns>
        public static string ConvertConcreteClassToString(ConcreteClass concreteClass)
        {
            return concreteClass.ToString().Replace("_", "/");
        }

        /// <summary>
        /// Converts concrete class as String to Enum.
        /// </summary>
        /// <param name="concreteClass"></param>
        /// <returns></returns>
        public static ConcreteClass ConvertStringToConcreteClass(string concreteClassString)
        {
            return (ConcreteClass)Enum.Parse(typeof(ConcreteClass), concreteClassString.Replace("/", "_"));
        }

        /// <summary>
        /// Convert exposure class to string.
        /// </summary>
        /// <param name="exposureClass"></param>
        /// <returns></returns>
        public static string ConvertExposureClassToString(ExposureClass exposureClass)
        {
            return exposureClass.ToString();
        }

        /// <summary>
        /// Converts exposure class as String to Enum.
        /// </summary>
        /// <param name="exposureClass"></param>
        /// <returns></returns>
        public static ExposureClass ConvertStringToExposureClass(string exposureClassString)
        {
            return (ExposureClass)Enum.Parse(typeof(ExposureClass), exposureClassString);
        }

        /// <summary>
        /// Convert structural class to string.
        /// </summary>
        /// <param name="structuralClass"></param>
        /// <returns></returns>
        public static string ConvertStructuralClassToString(StructuralClass structuralClass)
        {
            return structuralClass.ToString();
        }

        /// <summary>
        /// Converts structural class as String to Enum.
        /// </summary>
        /// <param name="structuralClass"></param>
        /// <returns></returns>
        public static StructuralClass ConvertStringToStructuralClass(string structuralClassString)
        {
            return (StructuralClass)Enum.Parse(typeof(StructuralClass), structuralClassString);
        }
        #endregion Converters
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
