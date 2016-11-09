using Calculators.SectionProperties;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Common.Extensions;

namespace StruCal.ViewModels
{
    public class SectionPropertyViewData
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }

    }

    public interface ISectionPropertiesViewModel
    {
        IEnumerable<SectionPropertyViewData> BaseSystemProperties { get; set; }
        IEnumerable<SectionPropertyViewData> CentralSystemProperties { get; set; }
        IEnumerable<SectionPropertyViewData> PrincipalSystemProperties { get; set; }

        string GetXCoordinates();
        string GetYCoordinates();
    }

    public class CustomSectionViewModel :ISectionPropertiesViewModel
    {
        private const string validationPattern = @"^((((-?)(0|[1-9][0-9]*)(\.[0-9]+)?);)+?)$";//@"^([1-9][0-9]+\.?[0-9]*;?)*$";

        public IEnumerable<SectionPropertyViewData> BaseSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> CentralSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> PrincipalSystemProperties { get; set; }

        [Display(Name = "X coordinates:")]
        [Required]
        [RegularExpression(validationPattern)]
        public string XCoordinates { get; set; }

        [Display(Name = "Y coordinates:")]
        [Required]
        [RegularExpression(validationPattern)]
        public string YCoordinates { get; set; }

        public string GetXCoordinates()
        {
            return XCoordinates;
        }

        public string GetYCoordinates()
        {
            return YCoordinates;
        }
    }

    public class RectangularSectionViewModel :ISectionPropertiesViewModel
    {
        public IEnumerable<SectionPropertyViewData> BaseSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> CentralSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> PrincipalSystemProperties { get; set; }

        [Required]
        [Display(Name ="Width:")]
        
        public double Width { get; set; }

        [Required]
        [Display(Name ="Height:")]
        public double Height { get; set; }

        public string GetXCoordinates()
        {
            var result = string.Format("0;{0};{0};0;", this.Width);
            return result;
        }

        public string GetYCoordinates()
        {
            var result = string.Format("0;0;{0};{0};", this.Height);
            return result;
        }
    }

    public class CircularSectionViewModel : ISectionPropertiesViewModel
    {
        public IEnumerable<SectionPropertyViewData> BaseSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> CentralSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> PrincipalSystemProperties { get; set; }


        [Required]
        [Display(Name = "Radious:")]
        public double Radious { get; set; }

        public string GetXCoordinates()
        {
            var result = this.getCoordinates(e => Math.Sin(e));
            return result;
        }

        public string GetYCoordinates()
        {
            var result = this.getCoordinates(e => Math.Cos(e));
            return result;
        }

        private string getCoordinates(Func<double,double> coordinateFunction)
        {
            var result = string.Empty;

            for (int i = 0; i <= 360; i++)
            {
                var alfa = (i - 90) * Math.PI / 180;
                var x = this.Radious*coordinateFunction(alfa);
                result = result + x.ToString() + ";";
            }
            return result;
        }
    }

    enum CoordinateSystemType
    {
        Base,
        Central,
        Principal,
    }

    public class SectionPropertiesOutputDataConverter
    {
        private static Dictionary<SectionProperty, CoordinateSystemType> sectionPropertyCoordinateSystemMap = new Dictionary<SectionProperty, CoordinateSystemType>
        {
            { SectionProperty.alfa,  CoordinateSystemType.Principal },
            { SectionProperty.F,     CoordinateSystemType.Base },
            { SectionProperty.I1,    CoordinateSystemType.Principal },
            { SectionProperty.I2,    CoordinateSystemType.Principal },
            { SectionProperty.Ix,    CoordinateSystemType.Base },
            { SectionProperty.Ix0,   CoordinateSystemType.Central },
            { SectionProperty.Ixy,   CoordinateSystemType.Base },
            { SectionProperty.Ixy0,  CoordinateSystemType.Central },
            { SectionProperty.Iy,    CoordinateSystemType.Base },
            { SectionProperty.Iy0,   CoordinateSystemType.Central },
            { SectionProperty.Sx,    CoordinateSystemType.Base },
            { SectionProperty.Sy,    CoordinateSystemType.Base },
            { SectionProperty.x0,    CoordinateSystemType.Base },
            { SectionProperty.x0_max,CoordinateSystemType.Central },
            { SectionProperty.x0_min,CoordinateSystemType.Central },
            { SectionProperty.xI_max,CoordinateSystemType.Principal },
            { SectionProperty.xI_min,CoordinateSystemType.Principal },
            { SectionProperty.y0,    CoordinateSystemType.Base },
            { SectionProperty.y0_max,CoordinateSystemType.Central },
            { SectionProperty.y0_min,CoordinateSystemType.Central },
            { SectionProperty.yI_max,CoordinateSystemType.Principal },
            { SectionProperty.yI_min,CoordinateSystemType.Principal },
        };

        private static Dictionary<SectionProperty, string> sectionPropertyDescriptions = new Dictionary<SectionProperty, string>
        {
            { SectionProperty.alfa,"Angle between principal axes and central axes" },
            { SectionProperty.F,"Area" },
            { SectionProperty.I1,"First principal moment of inertia" },
            { SectionProperty.I2,"Second principal moment of inertia" },
            { SectionProperty.Ix,"Moment of inertial about X axis" },
            { SectionProperty.Ix0,"Moment of inertial about central X axis" },
            { SectionProperty.Ixy,"Moment of deviation about X and Y axes" },
            { SectionProperty.Ixy0,"Moment of deviation about central X and Y axes" },
            { SectionProperty.Iy,"Moment of inertia about Y axis" },
            { SectionProperty.Iy0,"Moment of inertial about central Y axis" },
            { SectionProperty.Sx,"First moment of area about X axis" },
            { SectionProperty.Sy,"First moment of area about Y axis" },
            { SectionProperty.x0,"X coordinate of centre of gravity" },
            { SectionProperty.x0_max,"Extreme positive X coordinate in central coordinate system" },
            { SectionProperty.x0_min,"Extreme negative X coordinate in central coordinate system" },
            { SectionProperty.xI_max,"Extreme positive X coordinate in principal coordinate system" },
            { SectionProperty.xI_min,"Extereme negative X coordinate in principal coordinate system" },
            { SectionProperty.y0,"Y coordinate of centre of gravity" },
            { SectionProperty.y0_max,"Extreme positive Y coordinate in central coordinate system" },
            { SectionProperty.y0_min,"Extreme negative Y coordinate in central coordinate system" },
            { SectionProperty.yI_max,"Extreme positive Y coordinate in principal coordinate system" },
            { SectionProperty.yI_min,"Extereme negative Y coordinate in principal coordinate system" },
        };

        public ISectionPropertiesViewModel PrepareData<T>(IEnumerable<SectionPropertiesResult> sectionPropertiesResult) where T:ISectionPropertiesViewModel,new()
        {
            var result = new T();

            var baseSystemResults = new List<SectionPropertyViewData>();
            var centralSystemResults = new List<SectionPropertyViewData>();
            var principalSystemResults = new List<SectionPropertyViewData>();


            foreach (var item in sectionPropertiesResult)
            {
                var property = item.Property;

                var sectionResult = new SectionPropertyViewData
                {
                    Name = item.Property.ToString(),
                    Value = item.Value.ToString("F"),
                    Description = sectionPropertyDescriptions[property]
                };

                var coordinateSystem = sectionPropertyCoordinateSystemMap[property];
                if (coordinateSystem == CoordinateSystemType.Base)
                    baseSystemResults.Add(sectionResult);
                else if (coordinateSystem == CoordinateSystemType.Central)
                    centralSystemResults.Add(sectionResult);
                else
                    principalSystemResults.Add(sectionResult);
            }

            result.BaseSystemProperties = baseSystemResults;
            result.CentralSystemProperties = centralSystemResults;
            result.PrincipalSystemProperties = principalSystemResults;
            return result;
        }
    }


}