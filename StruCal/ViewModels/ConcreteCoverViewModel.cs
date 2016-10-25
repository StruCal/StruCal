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
            ArrangementOfBarsSelectList = Enum.GetNames(typeof(ArrangementOfBars)).Select(name => new SelectListItem()
            {
                Text = name,
                Value = name
            });
            ConcreteClassSelectList = Enum.GetNames(typeof(ConcreteClass)).Select(name => new SelectListItem()
            {
                Text = ConvertConcreteClassToString(name),
                Value = ConvertConcreteClassToString(name)
            });
            ExposureClassSelectList = Enum.GetNames(typeof(ExposureClass)).Select(name => new SelectListItem()
            {
                Text = name,
                Value = name
            });
            BaseStructuralClassSelectList = GetBaseStructuralClass();
        }

        /// <summary>
        /// Validation string pattern for input text.
        /// </summary>
        public const string validationPattern = @"^((((-?)(0|[1-9][0-9]*)(\.[0-9]+)?);)+?)$";//@"^([1-9][0-9]+\.?[0-9]*;?)*$";

        // Rebars properties
        [Required]
        [Display(Name = "Rebars:")]
        public IEnumerable<SelectListItem> RebarDiameterSelectList { get; set; }

        [Required]
        [Display(Name = "Arrangement of bars:")]
        public IEnumerable<SelectListItem> ArrangementOfBarsSelectList { get; set; }

        // Concrete properties
        [Required]
        [Display(Name = "Concrete class:")]
        public IEnumerable<SelectListItem> ConcreteClassSelectList { get; set; }

        [Required]
        [Display(Name = "Exposure class:")]
        public IEnumerable<SelectListItem> ExposureClassSelectList { get; set; }

        [Required]
        [Display(Name = "Base structural class:")]
        public IEnumerable<SelectListItem> BaseStructuralClassSelectList { get; set; }

        [Required]
        [Display(Name = "Is nominal maximum aggregate size is greater than 32mm?")]
        public string NominalMaximumAggregateSizeIsGreaterThan32mm { get; set; }

        // Bond Requirement
        [Required]
        [Display(Name = "Minimum cover Due to bond requirement:")]
        public string MinimumCoverDueToBondRequirement { get; set; }

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
        [Display(Name = "Real structural class:")]
        public string StructuralClass { get; set; }
        [Required]
        [Display(Name = "Minimum cover due to environmental conditions:")]
        public double MinimumCoverDueToEnvironmentalConditions { get; set; }

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
        [Required]
        [Display(Name = "Minimum cover:")]
        public double MinimumCover { get; set; }

        [Required]
        [Display(Name = "Allowance in design for deviation:")]
        [RegularExpression(validationPattern)]
        public double AllowanceInDesignForDeviation { get; set; }

        [Required]
        [Display(Name = "Nominal cover:")]
        public double NominalCover { get; set; }

        #region Private Methods
        /// <summary>
        /// Converts '_' to '/' for visual purposes of concrete class DropdownList.
        /// </summary>
        /// <param name="concreteClass"></param>
        /// <returns></returns>
        private string ConvertConcreteClassToString(string concreteClass)
        {
            return concreteClass.ToString().Replace("_", "/");
        }

        /// <summary>
        /// Converts '_' to '/' for visual purposes of concrete class DropdownList.
        /// </summary>
        /// <param name="concreteClass"></param>
        /// <returns></returns>
        private string ConvertConcreteClassToString(ConcreteClass concreteClass)
        {
            return concreteClass.ToString().Replace("_", "/");
        }

        /// <summary>
        /// Converts '_' to '/' for visual purposes of concrete class DropdownList.
        /// </summary>
        /// <param name="concreteClass"></param>
        /// <returns></returns>
        private ConcreteClass ConvertStringToConcreteClass(string concreteClassString)
        {
            return (ConcreteClass)Enum.Parse(typeof(ConcreteClass), concreteClassString);
        }

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
        private IEnumerable<SelectListItem> GetRebarDiameters()
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
        private IEnumerable<SelectListItem> GetBaseStructuralClass()
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