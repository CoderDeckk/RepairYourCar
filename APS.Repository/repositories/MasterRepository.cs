using APS.Domain.DBModels;
using APS.Repository.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace APS.Repository.repositories
{
   public class MasterRepository:IMasterRepository
    {
        private readonly APSContext _apsContext;
        public MasterRepository(APSContext apsContext)
        {
            this._apsContext = apsContext;
        }
        public IEnumerable<LookupValues> GetLookupType(string type)
        {
            IEnumerable<LookupValues> lookupValueList = from lookup in _apsContext.LookupType
                         join lookupValues in _apsContext.LookupValues on lookup.Id equals lookupValues.LookUpTypeId
                         where lookup.Type == type select lookupValues;
            return lookupValueList;
        }
    }
}
