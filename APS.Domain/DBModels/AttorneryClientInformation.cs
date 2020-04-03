using System;
using System.Collections.Generic;

namespace APS.Domain.DBModels
{
    public partial class AttorneryClientInformation
    {
        public AttorneryClientInformation()
        {
            CashAccountsInformation = new HashSet<CashAccountsInformation>();
            InvestmentAccountInformation = new HashSet<InvestmentAccountInformation>();
            SpouseInformation = new HashSet<SpouseInformation>();
        }

        public long Id { get; set; }
        public Guid UniqueId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Alias1 { get; set; }
        public string Alias2 { get; set; }
        public string Address { get; set; }
        public decimal Zip { get; set; }
        public decimal? HomePhone { get; set; }
        public decimal? WorkPhone { get; set; }
        public decimal? CellPhone { get; set; }
        public decimal? VoiceMailPhone { get; set; }
        public string EmailAddress { get; set; }
        public decimal Ss { get; set; }
        public DateTime DateOfBirth { get; set; }
        public long Gender { get; set; }
        public long Title { get; set; }
        public DateTime? DateOfMarriage { get; set; }
        public decimal? DriverLicenceNumber { get; set; }
        public decimal? DriverLicenseState { get; set; }
        public DateTime DriverLicenseExpireDate { get; set; }
        public bool IsVeteran { get; set; }
        public bool IsWidow { get; set; }
        public long HealthStatus { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public bool? IsActive { get; set; }

        public ICollection<CashAccountsInformation> CashAccountsInformation { get; set; }
        public ICollection<InvestmentAccountInformation> InvestmentAccountInformation { get; set; }
        public ICollection<SpouseInformation> SpouseInformation { get; set; }
    }
}
