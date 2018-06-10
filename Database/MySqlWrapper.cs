using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    internal class MySqlWrapper
    {
        private readonly string connectionString;

        public MySqlWrapper(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public void Execute(Action<MySqlConnection> action)
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                action?.Invoke(connection);
            }
        }

        public TResult Query<TResult>(Func<MySqlConnection, TResult> factory)
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                var result = factory.Invoke(connection);
                return result;
            }
        }
    }
}