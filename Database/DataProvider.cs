using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    public class DataProvider
    {
        private readonly MySqlWrapper mysql;

        public DataProvider(string connectionString)
        {
            this.mysql = new MySqlWrapper(connectionString);
        }

        public Guid StartOperation()
        {
            var result = this.mysql.Query(connection => connection.QueryFirst<Guid>(SqlQueries.StartOperation));
            return result;
        }

        public void AddProgress(Guid operationGuid, int progress)
        {
            this.mysql.Execute(connection => connection.Execute(SqlQueries.AddProgress, new { operationGuid, progress }));
        }

        public int GetProgress(Guid operationGuid)
        {
            return this.mysql.Query(connection => connection.QueryFirst<int>(SqlQueries.GetProgress, new { operationGuid }));
        }

        public void SetResult(Guid operationGuid, object result)
        {
            this.mysql.Execute(connection => connection.Execute(SqlQueries.AddResult, new { operationGuid, result }));
        }
    }
}