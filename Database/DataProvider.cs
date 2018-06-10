using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    public class DataProvider : IDataProvider
    {
        private readonly MySqlProvider mysql;

        public DataProvider(MySqlProvider mysql)
        {
            this.mysql = mysql;
        }

        public Guid StartOperation()
        {
            var result = this.mysql.Query(connection => connection.QueryFirst<Guid>(SqlQueries.StartOperation));
            return result;
        }

        public void SetProgress(Guid operationGuid, int progress)
        {
            this.mysql.Execute(connection => connection.Execute(SqlQueries.SetProgress, new { operationGuid, progress }));
        }

        public int GetProgress(Guid operationGuid)
        {
            return this.mysql.Query(connection => connection.QueryFirst<int>(SqlQueries.GetProgress, new { operationGuid }));
        }

        public void SetResult(Guid operationGuid, object result)
        {
            this.mysql.Execute(connection => connection.Execute(SqlQueries.SetResult, new { operationGuid, result }));
        }

        public string GetResult(Guid operationGuid)
        {
            return this.mysql.Query(connection => connection.QueryFirst<string>(SqlQueries.GetResult, new { operationGuid }));
        }
    }
}