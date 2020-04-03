using APS.DTO.dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace APS.Service.interfaces
{
   public interface IMasterService
    {
        bool AddLookupType(LookupTypeModel lookupTypeModel);
        IEnumerable<LookupValuesModel> GetMasterLookUpValues(string lookupType);
        IEnumerable<LookupTypeModel> GetMasterLookUpTypeByUniqueid(Guid lookupTypeId);
    }
}
