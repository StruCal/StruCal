using Calculators.TrainLoad.GradienColor;

namespace Calculators.TrainLoad
{
    internal interface IGradientCalculator
    {
        Color ColorAt(int index);
    }
}