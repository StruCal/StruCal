using Calculators.ConcreteCover;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StruCal.ViewModels
{
    public class ConcreteCoverViewModel
    {
        /// <summary>
        /// Create Concrete Cover View Model.
        /// Aggregates appropriate SelectListIteams for DropdownLists.
        /// </summary>
        public ConcreteCoverViewModel()
        {
            RebarDiameterSelectList = GetRebarDiameters();
            // Select 16 mm rebar as default
            RebarDiameterSelectList[7].Selected = true;

            ArrangementOfBarsSelectList = Enum.GetNames(typeof(ArrangementOfBars)).Select(name => new SelectListItem()
            {
                Text = name,
                Value = name
            }).ToList();
            // Select Separated arragement as default
            ArrangementOfBarsSelectList[0].Selected = true;

            ConcreteClassSelectList = Enum.GetNames(typeof(ConcreteClass)).Select(name => new SelectListItem()
            {
                Text = ConvertConcreteClassToString(name),
                Value = ConvertConcreteClassToString(name)
            }).ToList();
            // Select C30/37 as default class
            ConcreteClassSelectList[4].Selected = true;

            ExposureClassSelectList = Enum.GetNames(typeof(ExposureClass)).Select(name => new SelectListItem()
            {
                Text = name,
                Value = name
            }).ToList();
            // Select X0 as default class
            ExposureClassSelectList[0].Selected = true;

            BaseStructuralClassSelectList = GetBaseStructuralClass();
            // Select S4 class as default
            BaseStructuralClassSelectList[3].Selected = true;
        }

        /// <summary>
        /// Validation string pattern for input text.
        /// </summary>
        public const string validationPattern = @"^((((-?)(0|[1-9][0-9]*)(\.[0-9]+)?);)+?)$";//@"^([1-9][0-9]+\.?[0-9]*;?)*$";

        // Rebars properties
        [Required]
        [Display(Name = "Rebars:")]
        public List<SelectListItem> RebarDiameterSelectList { get; set; }
        public string SelectedRebarDiameter { get; set; }

        [Required]
        [Display(Name = "Arrangement of bars:")]
        public List<SelectListItem> ArrangementOfBarsSelectList { get; set; }
        public string SelectedArrangementOfBars { get; set; }

        // Concrete properties
        [Required]
        [Display(Name = "Concrete class:")]
        public List<SelectListItem> ConcreteClassSelectList { get; set; }
        public string SelectedConcreteClass { get; set; }

        [Required]
        [Display(Name = "Exposure class:")]
        public List<SelectListItem> ExposureClassSelectList { get; set; }
        public string SelectedExposureClass { get; set; }

        [Required]
        [Display(Name = "Base structural class:")]
        public List<SelectListItem> BaseStructuralClassSelectList { get; set; }
        public string SelectedBaseStructuralClass { get; set; }

        [Required]
        [Display(Name = "Is nominal maximum aggregate size is greater than 32mm?")]
        public bool NominalMaximumAggregateSizeIsGreaterThan32mm { get; set; }

        // EnvironmentalConditions
        [Required]
        [Display(Name = "Is design working life of 100 years?")]
        public bool DesignWorkingLifeOf100Years { get; set; }
        [Required]
        [Display(Name = "Is member with slab geometry?")]
        public bool MemberWithSlabGeometry { get; set; }
        [Required]
        [Display(Name = "Is special quality control of the concrete production ensured?")]
        public bool SpecialQualityControlOfTheConcreteProductionEnsured { get; set; }
        [Required]
        [Display(Name = "Structural class:")]
        public string StructuralClass { get; set; }

        // Additive Safety Element
        [Required]
        [Display(Name = "Additive safety element:")]
        public double AdditiveSafetyElement { get; set; }

        // Reduction Of Minimum Cover For Use Of Stainless Steel
        [Required]
        [Display(Name = "Reduction of minimum cover for use of stainless steel:")]
        public double ReductionOfMinimumCoverForUseOfStainlessSteel { get; set; }

        // Reduction Of Minimum Cover For Use Of Additional Protection
        [Required]
        [Display(Name = "Reduction of minimum cover for use of additional protection:")]
        public double ReductionOfMinimumCoverForUseOfAdditionalProtection { get; set; }

        // Results
        // Bond Requirement
        [Required]
        [Display(Name = "Minimum cover due to bond requirement:")]
        public double MinimumCoverDueToBondRequirement { get; set; }

        [Required]
        [Display(Name = "Minimum cover due to environmental conditions:")]
        public double MinimumCoverDueToEnvironmentalConditions { get; set; }

        [Required]
        [Display(Name = "Minimum cover:")]
        public double MinimumCover { get; set; }

        [Required]
        [Display(Name = "Allowance in design for deviation:")]
        public double AllowanceInDesignForDeviation { get; set; }

        [Required]
        [Display(Name = "Nominal cover")]
        public double NominalCover { get; set; }

        #region Converters
        /// <summary>
        /// Converts rebar diameter as String to double.
        /// </summary>
        /// <param name="rebarString"></param>
        /// <returns></returns>
        public double ConvertStringToRebarDiameter(string rebarString)
        {
            int index = rebarString.IndexOf(" ");
            if (index > 0) rebarString = rebarString.Substring(0, index);

            return double.Parse(rebarString) / 1000d;
        }

        /// <summary>
        /// Converts arrangement of bars as String to enum.
        /// </summary>
        /// <param name="arrangementOfBarsString"></param>
        /// <returns></returns>
        public ArrangementOfBars ConvertStringToArrangementOfBars(string arrangementOfBarsString)
        {
            return (ArrangementOfBars)Enum.Parse(typeof(ArrangementOfBars), arrangementOfBarsString);
        }

        /// <summary>
        /// Converts '_' to '/' for visual purposes of concrete class DropdownList.
        /// </summary>
        /// <param name="concreteClass"></param>
        /// <returns></returns>
        public string ConvertConcreteClassToString(string concreteClass)
        {
            return concreteClass.ToString().Replace("_", "/");
        }

        /// <summary>
        /// Converts '_' to '/' for visual purposes of concrete class DropdownList.
        /// </summary>
        /// <param name="concreteClass"></param>
        /// <returns></returns>
        public string ConvertConcreteClassToString(ConcreteClass concreteClass)
        {
            return concreteClass.ToString().Replace("_", "/");
        }

        /// <summary>
        /// Converts concrete class as String to Enum.
        /// </summary>
        /// <param name="concreteClass"></param>
        /// <returns></returns>
        public ConcreteClass ConvertStringToConcreteClass(string concreteClassString)
        {
            return (ConcreteClass)Enum.Parse(typeof(ConcreteClass), concreteClassString.Replace("/", "_"));
        }

        /// <summary>
        /// Converts exposure class as String to Enum.
        /// </summary>
        /// <param name="exposureClass"></param>
        /// <returns></returns>
        public ExposureClass ConvertStringToExposureClass(string exposureClassString)
        {
            return (ExposureClass)Enum.Parse(typeof(ExposureClass), exposureClassString);
        }

        /// <summary>
        /// Converts structural class as String to Enum.
        /// </summary>
        /// <param name="structuralClass"></param>
        /// <returns></returns>
        public StructuralClass ConvertStringToStructuralClass(string structuralClassString)
        {
            return (StructuralClass)Enum.Parse(typeof(StructuralClass), structuralClassString);
        }
        #endregion Converters

        #region Private Methods
        /// <summary>
        /// List of available rebars diameters.
        /// </summary>
        private List<double> rebarDiameters = new List<double>()
        {
            4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32, 40
        };

        /// <summary>
        /// Return all available rebars diameters as SelectListItems.
        /// </summary>
        /// <returns></returns>
        private List<SelectListItem> GetRebarDiameters()
        {
            List<SelectListItem> rebarDiametersSelectList = new List<SelectListItem>();

            foreach (double rebarDiameter in rebarDiameters)
            {
                rebarDiametersSelectList.Add(new SelectListItem()
                {
                    Text = rebarDiameter.ToString() + " mm",
                    Value = rebarDiameter.ToString()
                }
                );
            }

            return rebarDiametersSelectList;
        }

        /// <summary>
        /// Return all appropriate structural classes.
        /// </summary>
        /// <returns></returns>
        private List<SelectListItem> GetBaseStructuralClass()
        {
            List<SelectListItem> baseStructuralClassSelectList = new List<SelectListItem>();

            var names = Enum.GetNames(typeof(StructuralClass));


            foreach (string structuralClassName in Enum.GetNames(typeof(StructuralClass)))
            {
                if (structuralClassName == "S1" || structuralClassName == "S2" || structuralClassName == "S3" ||
                    structuralClassName == "S4" || structuralClassName == "S5" || structuralClassName == "S6")
                {
                    baseStructuralClassSelectList.Add(new SelectListItem()
                    {
                        Text = structuralClassName,
                        Value = structuralClassName
                    }
                );
                }
            };
            return baseStructuralClassSelectList;
        }
        #endregion
    }
}