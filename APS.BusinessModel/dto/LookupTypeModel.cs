using System;
using System.Collections.Generic;
using System.Text;

namespace APS.DTO.dto
{
   public class LookupTypeModel
    {
        public long Id { get; set; }
        public Guid UniqueId { get; set; }
        public string Type { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
    }
}
