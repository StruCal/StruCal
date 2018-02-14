using Calculators.TrainLoad;
using Calculators.TrainLoad.Output;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrainLoadTest
{
    class Program
    {
        static void Main(string[] args)
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
