using Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StruCal.Utils
{
    public enum MessageType
    {
        None = 0,
        ReceivingInputData = 1,
        Calculations = 2,
        PreparingResult = 3,
        SendingResults = 4
    }

    public class TrailLoadProgress
    {
        private readonly IDataProvider dataProvider;

        public TrailLoadProgress(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public void SendProgress(Guid operationGuid, MessageType type)
        {
            this.dataProvider.SetProgress(operationGuid, (int)type);
        }
    }
}