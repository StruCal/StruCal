using System;

namespace Database
{
    public interface IDataProvider
    {
        int GetProgress(Guid operationGuid);

        string GetResult(Guid operationGuid);

        void SetProgress(Guid operationGuid, int progress);

        void SetResult(Guid operationGuid, object result);

        Guid StartOperation();
    }
}