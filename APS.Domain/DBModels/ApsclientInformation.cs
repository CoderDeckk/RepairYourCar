using System;
using System.Collections.Generic;

namespace APS.Domain.DBModels
{
    public partial class ApsclientInformation
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public Guid UniqueId { get; set; }
        public long AttorneryClientInformationId { get; set; }
        public string CompanyName { get; set; }
        public DateTime AssetAddedDate { get; set; }
        public bool IsOwnerDeceased { get; set; }
        public long InstructionLetterType { get; set; }
        public long AccountType { get; set; }
        public bool CreditUnion { get; set; }
        public string OriginalAccountNumber { get; set; }
        public string NewAccountNumber { get; set; }
        public long? OriginalOwnership { get; set; }
        public bool IsPriorFunding { get; set; }
        public long FundTo { get; set; }
        public bool IncludeValueInEstate { get; set; }
        public DateTime TranferredDate { get; set; }
        public decimal FileReferencenNumber { get; set; }
        public bool PowerOfAttorney { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool? IsActive { get; set; }
    }
}
