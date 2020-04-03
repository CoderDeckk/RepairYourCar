using APS.Domain.DBModels;
using APS.DTO.dto;
using APS.Repository;
using APS.Repository.interfaces;
using APS.Service.interfaces;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APS.Service.services
{
    public class MasterService : IMasterService
    {
        private readonly IGenericRepository<LookupType> _lookupRepository;
        private readonly IGenericRepository<LookupValues> _lookupValuesRepository;
        private readonly IMasterRepository _masterRepository;
        private readonly IMapper _mapper;

        public MasterService(IGenericRepository<LookupType>lookupRepository,IGenericRepository<LookupValues> lookupValuesRepository,
                             IMapper mapper, IMasterRepository masterRepository)
        {
            _lookupRepository = lookupRepository;
            _lookupValuesRepository = lookupValuesRepository;
            _mapper = mapper;
            _masterRepository = masterRepository;
        }
        public bool AddLookupType(LookupTypeModel lookupTypeModel)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<LookupTypeModel> GetMasterLookUpTypeByUniqueid(Guid lookupTypeId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<LookupValuesModel> GetMasterLookUpValues(string lookupType)
        {
             LookupType type=  _lookupRepository.GetFirstOrDefaultAsync(w=>w.Type== lookupType).Result;
            //IEnumerable<LookupValues> lookupValues = _masterRepository.GetLookupType(lookupType);
            IEnumerable<LookupValues> lookupValues = _lookupValuesRepository.Find(w => w.LookUpTypeId == type.Id);
            IEnumerable<LookupValuesModel>lookupValuesModels=_mapper.Map<IEnumerable<LookupValuesModel> > (lookupValues);
            return lookupValuesModels;
        }
    }
}
