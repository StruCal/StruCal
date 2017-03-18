using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.RCBeam
{
    public class AxialCapacity
    {
        public static double TensionCapacity(IList<Bar> bars, Steel steel)
        {
            if (bars.Count == 0)
                return 0;
            double capacity = 0;
            foreach (var bar in bars)
            {
                capacity += bar.As * steel.Fyd * steel.K;
            }
            return -capacity;
        }
        public static double CompressionCapacity(IList<PointD> sectionCoordinates, Concrete concrete)
        {
            if (sectionCoordinates.Count == 0)
                return 0;
            var section = new Section(sectionCoordinates);
            double areaOfConcrete = SectionProperties.A(section.Coordinates);
            return areaOfConcrete * concrete.Fcd;
        }
    }
}
