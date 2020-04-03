using APS.Domain.DBModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace APS.Repository.interfaces
{
    public interface IMasterRepository
    {
        IEnumerable<LookupValues> GetLookupType(string type);
    }
}
