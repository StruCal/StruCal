using Database;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseTest
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var connectionString = "Server=mysql5.webio.pl;Port=3306;Database=15185_mzeg;Uid=15185_mzeg;Pwd=;";

            var dataProvider = new DataProvider(connectionString);
            var guid = dataProvider.StartOperation();
            dataProvider.AddProgress(guid, 30);
            dataProvider.AddProgress(guid, 40);
            dataProvider.AddProgress(guid, 50);
            dataProvider.AddProgress(guid, 60);

            var prog = dataProvider.GetProgress(guid);

            var json = JsonConvert.SerializeObject(new { A = 4, B = 10, C = 80, D = "aaa" });

            dataProvider.SetResult(guid, json);
        }
    }
}