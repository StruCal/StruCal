using FEM2D.Restraints;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Helpers
{
    internal static class RestraintConverter
    {
        internal static Restraint ConvertFromString(string value)
        {
            Restraint result = Restraint.Free;
            var items = value.Split('|').Select(e=>e.Trim());
            foreach (var item in items)
            {
                if (item == "UX")
                    result |= Restraint.FixedX;
                if (item == "UY")
                    result |= Restraint.FixedY;
            }
            return result;
        }
    }
}
