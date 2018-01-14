using Calculators.TrainLoad.GradienColor;

namespace Calculators.TrainLoad
{
    internal interface IGradient
    {
        Color ColorAt(int index);
        int Range { get; }
    }
}