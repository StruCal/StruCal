using Calculators.TrainLoad.GradienColor;
using Common.Geometry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculators.TrainLoad.Output
{
    public class VertexStressResult
    {
        public Point3D Position { get; private set; }
        public double Displacement { get; private set; }
        public double Stress { get; private set; }

        public static VertexStressResult GenerateVertexResult(Point3D vertex, double displ, double stress)
        {
            return new VertexStressResult
            {
                Position = vertex,
                Stress = stress,
                Displacement = displ,
            };
        }

        public VertexColorResult ConvertToColor(ColorProvider colorProvider)
        {
            var result = new VertexColorResult();
            result.Displacement = this.Displacement;
            result.Position = this.Position;
            result.Color = colorProvider.GetColor(this.Stress);
            return result;
        }
    }
}
