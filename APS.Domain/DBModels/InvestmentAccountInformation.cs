using System;
using System.Collections.Generic;

namespace APS.Domain.DBModels
{
    public partial class InvestmentAccountInformation
    {
        public long Id { get; set; }
        public Guid UniqueId { get; set; }
        public long AttorneryClientInformationId { get; set; }
        public DateTime InvestAssetAddedDate { get; set; }
        public bool InvestIsOwnerDeceased { get; set; }
        public long InvestType { get; set; }
        public bool InvestIncludeInstructionLetter { get; set; }
        public string InvestOriginalAccountNumber { get; set; }
        public string InvestNewAccountNumber { get; set; }
        public decimal InvestFundNumber { get; set; }
        public long InvestTypeOfAccountForm { get; set; }
        public long? InvestOriginalOwnership { get; set; }
        public bool InvestIsPriorFunding { get; set; }
        public long InvestFundTo { get; set; }
        public bool InvestIncludeValueInEstate { get; set; }
        public DateTime InvestTranferredDate { get; set; }
        public decimal InvestFileReferencenNumber { get; set; }
        public bool InvestIncludeTrusteeReference { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Createdon { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool? IsActive { get; set; }

        public AttorneryClientInformation AttorneryClientInformation { get; set; }
    }
}
