using Calculators.TrainLoad;
using Newtonsoft.Json;
using System;

namespace TrainLoadTest
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var trainLoadInput = JsonConvert.DeserializeObject<TrainLoadInput>(MockedData.Input);

            var trainLoadCalculator = new TrainLoadCalculator(trainLoadInput);
            var result = trainLoadCalculator.Calculate();

            var resultTxt = JsonConvert.SerializeObject(result);

            var isOK = resultTxt == MockedData.Output;
            Console.WriteLine(isOK);
            Console.Read();
        }
    }
}