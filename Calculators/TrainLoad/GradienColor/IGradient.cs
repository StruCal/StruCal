using Calculators.TrainLoad.GradienColor;

namespace Calculators.TrainLoad
{
    public interface IGradient
    {
        Color ColorAt(int index);

        int Range { get; }
    }
}