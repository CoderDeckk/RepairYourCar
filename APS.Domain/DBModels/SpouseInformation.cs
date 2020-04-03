using System;
using System.Collections.Generic;

namespace APS.Domain.DBModels
{
    public partial class SpouseInformation
    {
        public long Id { get; set; }
        public Guid UniqueId { get; set; }
        public long? AttorneryClientInformationId { get; set; }
        public string SpouseFirstName { get; set; }
        public string SpouseMiddleName { get; set; }
        public string SpouseLastName { get; set; }
        public string SpouseAlias1 { get; set; }
        public string SpouseAlias2 { get; set; }
        public decimal? SpouseWorkPhone { get; set; }
        public decimal? SpouseCellPhone { get; set; }
        public decimal? SpouseVoiceMailPhone { get; set; }
        public string SpouseEmailAddress { get; set; }
        public decimal SpouseSs { get; set; }
        public DateTime SpouseDateOfBirth { get; set; }
        public long SpouseGender { get; set; }
        public long SpouseTitle { get; set; }
        public decimal? DriverLicenceNumber { get; set; }
        public decimal? DriverLicenseState { get; set; }
        public DateTime DriverLicenseExpireDate { get; set; }
        public bool SpouseIsVeteran { get; set; }
        public bool SpouseIsWidow { get; set; }
        public long SpouseHealthStatus { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public bool? IsActive { get; set; }

        public AttorneryClientInformation AttorneryClientInformation { get; set; }
    }
}
