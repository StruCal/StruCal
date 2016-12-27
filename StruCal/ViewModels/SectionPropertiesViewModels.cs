using Calculators.SectionProperties;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Common.Extensions;
using System.Text;
using Common.Geometry;
using StruCal.Validators;

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
        
        public IEnumerable<SectionPropertyViewData> BaseSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> CentralSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> PrincipalSystemProperties { get; set; }

        [Required(ErrorMessage = "Coordinates are empty.")]
        [Display(Name = "Coordinates:")]
        [RegularExpression(RegexPatterns.CustomSectionValidationPattern,ErrorMessage ="Provided input for X Coordinates is invalid.")]
        public string Coordinates { get; set; }


        public string GetXCoordinates()
        {
            var result = convertCoordinates(e=>e[0]);

            return result;
        }

        public string GetYCoordinates()
        {
            var result = convertCoordinates(e => e[1]);

            return result;
        }

        private string convertCoordinates(Func<string[],string> coordinatePicker)
        {
            var coordinates = this.Coordinates.Split(' ');

            var result = string.Empty;
            foreach (var coord in coordinates)
            {
                var tempCoord = coord.Split(';');
                result = result + coordinatePicker?.Invoke(tempCoord) + ";";
            }

            return result;
        }
    }

    public class RectangularSectionViewModel :ISectionPropertiesViewModel
    {
        public IEnumerable<SectionPropertyViewData> BaseSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> CentralSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> PrincipalSystemProperties { get; set; }

        [Required(ErrorMessage ="Width is empty.")]
        [Display(Name ="Width:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern,ErrorMessage ="Width is not a positive number.")]
        public string Width { get; set; }

        [Required(ErrorMessage = "Height is empty.")]
        [Display(Name ="Height:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Height is not a positive number.")]
        public string Height { get; set; }

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

        [Required(ErrorMessage = "Radious is empty.")]
        [Display(Name = "Radious:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Radious is not a positive number.")]
        
        public string Radious { get; set; }

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

            var radious = double.Parse(this.Radious);
            for (int i = 0; i <= 360; i++)
            {
                var alfa = (i - 90) * Math.PI / 180;
                var x = radious*coordinateFunction(alfa);
                result = result + x.ToString() + ";";
            }
            return result;
        }
    }

    public class TSectionViewModel : ISectionPropertiesViewModel
    {

        public IEnumerable<SectionPropertyViewData> BaseSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> CentralSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> PrincipalSystemProperties { get; set; }

        [Required(ErrorMessage = "Height is empty.")]
        [Display(Name = "Section Height:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Height is not a positive number.")]
        public string Height { get; set; }

        [Required(ErrorMessage = "Flange Width is empty.")]
        [Display(Name ="Flange width:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Width is not a positive number.")]
        public string FlangeWidth { get; set; }

        [Required(ErrorMessage = "Flange thickness is empty.")]
        [Display(Name ="Flange thickness:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Flange thickness is not a positive number.")]
        public string FlangeThickness { get; set; }

        [Required(ErrorMessage = "Web thickness is empty.")]
        [Display(Name ="Web thickness:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Web thickness is not a positive number.")]
        public string WebThickness { get; set; }

        public string GetXCoordinates()
        {
            var flangeWidth = double.Parse(this.FlangeWidth);
            var webThickness = double.Parse(this.WebThickness); 

            var x = new List<double>();
            x.Add(0);
            x.Add(0);
            x.Add(flangeWidth / 2 - webThickness / 2);
            x.Add(flangeWidth / 2 - webThickness / 2);
            x.Add(flangeWidth / 2 + webThickness / 2);
            x.Add(flangeWidth / 2 + webThickness / 2);
            x.Add(flangeWidth);
            x.Add(flangeWidth);

            var result = string.Join(";", x);

            return result;
        }

        public string GetYCoordinates()
        {
            var height = double.Parse(this.Height);
            var flangeThickness = double.Parse(this.FlangeThickness);

            var y = new List<double>();
            y.Add(height);
            y.Add(height - flangeThickness);
            y.Add(height - flangeThickness);
            y.Add(0);
            y.Add(0);
            y.Add(height - flangeThickness);
            y.Add(height - flangeThickness);
            y.Add(height);

            var result = string.Join(";", y);
            return result;
        }

    }

    public class ISectionViewModel : ISectionPropertiesViewModel
    {

        public IEnumerable<SectionPropertyViewData> BaseSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> CentralSystemProperties { get; set; }
        public IEnumerable<SectionPropertyViewData> PrincipalSystemProperties { get; set; }

        [Required(ErrorMessage = "Section height is empty.")]
        [Display(Name = "Section Height:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Height is not a positive number.")]
        public string Height { get; set; }

        [Required(ErrorMessage = "Top Flange width is empty.")]
        [Display(Name = "Top Flange width:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Top flange width is not a positive number.")]
        public string TopFlangeWidth { get; set; }

        [Required(ErrorMessage = "Top Flange thickness is empty.")]
        [Display(Name = "Top Flange thickness:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Top flange thickness is not a positive number.")]
        public string TopFlangeThickness { get; set; }

        [Required(ErrorMessage = "Bottom Flange width is empty.")]
        [Display(Name = "Bottom Flange width:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Bottom flange width is not a positive number.")]
        public string BottomFlangeWidth { get; set; }

        [Required(ErrorMessage = "Bottom Flange thickness is empty.")]
        [Display(Name = "Bottom Flange thickness:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Bottom flange thickness is not a positive number.")]
        public string BottomFlangeThickness { get; set; }

        [Required(ErrorMessage = "Web thickness is empty.")]
        [Display(Name = "Web thickness:")]
        [RegularExpression(RegexPatterns.PositiveNumberValidationPattern, ErrorMessage = "Web thickness is not a positive number.")]
        public string WebThickness { get; set; }

        public string GetXCoordinates()
        {
            var topFlangeWidth = double.Parse(this.TopFlangeWidth);
            var webThickness = double.Parse(this.WebThickness);
            var bottomFlangeWidth = double.Parse(this.BottomFlangeWidth);
            
            var x = new List<double>();
            x.Add(-topFlangeWidth/2);//upper left corner
            x.Add(-topFlangeWidth/2);
            x.Add(-webThickness/2);
            x.Add(-webThickness/2);
            x.Add(-bottomFlangeWidth/2);
            x.Add(-bottomFlangeWidth/2);
            x.Add(bottomFlangeWidth/2);
            x.Add(bottomFlangeWidth/2);
            x.Add(webThickness/2);
            x.Add(webThickness/2);
            x.Add(topFlangeWidth/2);
            x.Add(topFlangeWidth/2);

            var result = string.Join(";", x);

            return result;
        }

        public string GetYCoordinates()
        {
            var height = double.Parse(this.Height);
            var bottomFlangeThickness = double.Parse(this.BottomFlangeThickness);
            var topFlangeThickness = double.Parse(this.TopFlangeThickness);

            var y = new List<double>();
            y.Add(height);
            y.Add(height-topFlangeThickness);
            y.Add(height-topFlangeThickness);
            y.Add(bottomFlangeThickness);
            y.Add(bottomFlangeThickness);
            y.Add(0);
            y.Add(0);
            y.Add(bottomFlangeThickness);
            y.Add(bottomFlangeThickness);
            y.Add(height-topFlangeThickness);
            y.Add(height-topFlangeThickness);
            y.Add(height);

            var result = string.Join(";", y);
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