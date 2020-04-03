using APS.Domain.DBModels;
using APS.Domain.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace APS.UnitTest
{
    public static class DbContextExtensions
    {
        public static void Seed(APSContext dbContext)
        {
            //Seed your Domain entities object here
            #region Lookup & lookupValues
            dbContext.LookupType.Add(new LookupType()
            {
              Id=1,
              CreatedBy="Dnyaneshwar",
              Type="Country",
              CreatedOn=DateTime.UtcNow,
              UniqueId = new Guid("F3BB9C87-8DA1-43E1-BB70-D2830B2AD8DD")
            });
            dbContext.LookupValues.Add(new LookupValues()
            {
                Id = 1,
                CreatedBy = "Dnyaneshwar",
                LookUpTypeId = 1,
                Value="India",
                CreatedOn = DateTime.UtcNow,
                UniqueId = new Guid("A5AE6EB6-F291-4A6F-B3BB-EE830D22314F")
            });
            #endregion
            dbContext.SaveChanges();
        }
    }
}
