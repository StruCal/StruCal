using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    internal class SqlQueries
    {
        public static string StartOperation => @"

                INSERT INTO operations () VALUES ();

                SELECT Guid FROM operations WHERE Id = (SELECT MAX(Id) FROM operations);
                ";

        public static string AddProgress => @"
                INSERT INTO progress (OperationId, Progress)
                SELECT operations.Id, @progress
                FROM operations WHERE operations.Guid = @operationGuid
        ";

        public static string GetProgress => @"
                SELECT P1.Progress FROM progress AS P1
                LEFT JOIN progress AS P2 ON P1.timestamp < P2.timestamp
                WHERE P2.Id IS NULL AND P1.OperationId =
                                (SELECT operations.Id
                                 FROM operations
                                 WHERE operations.Guid = @operationGuid)
                ;
                ";

        public static string AddResult => @"
                INSERT INTO results (OperationId, Result)
                SELECT operations.Id, @result
                FROM operations WHERE operations.Guid = @operationGuid
                ";
    }
}