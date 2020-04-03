using APS.Domain.DBModels;
using APS.DTO.dto;
using APS.Repository.customentities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace APS.DTO.MapperProfile
{
   public class MapProfile:Profile
    {
        public MapProfile()
        {
            //Register your dependencies here
            CreateMap<LoginModel, LoginEntity>().IgnoreAllNonExisting();
            CreateMap<LookupTypeModel, LookupType>().IgnoreAllNonExisting();
            CreateMap<LookupValuesModel, LookupValues>().IgnoreAllNonExisting();
            CreateMap<LookupValues, LookupValuesModel>().IgnoreAllNonExisting();
            //CreateMap<IEnumerable<LookupValues>, IEnumerable<LookupValuesModel>>();
            //CreateMap<IEnumerable<LookupValuesModel>, IEnumerable<LookupValues>>().IgnoreAllNonExisting();
        }
    }
    public class NoMapAttribute : System.Attribute
    {
    }
    public static class IgnoreProperty
    {
        public static IMappingExpression<TSource, TDestination>
                IgnoreAllNonExisting<TSource, TDestination>(this IMappingExpression<TSource, TDestination> expression)
        {
            var sourceType = typeof(TSource);
            var destinationType = typeof(TDestination);
            foreach (var property in sourceType.GetProperties())
            {
                PropertyDescriptor descriptor = TypeDescriptor.GetProperties(sourceType)[property.Name];
                NoMapAttribute attribute = (NoMapAttribute)descriptor.Attributes[typeof(NoMapAttribute)];
                if (attribute != null)
                    expression.ForMember(property.Name, opt => opt.Ignore());
            }
            return expression;
        }
    }
}
