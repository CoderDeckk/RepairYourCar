using System;
using System.Collections.Generic;

namespace APS.Domain.DBModels
{
    public partial class LookupType
    {
        public long Id { get; set; }
        public Guid UniqueId { get; set; }
        public string Type { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsActive { get; set; }
    }
}
