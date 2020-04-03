using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using APS.DTO.dto;
using APS.Service.interfaces;
using APS.Web.Models;
using Lib.AspNetCore.Mvc.JqGrid.Core.Json;
using Lib.AspNetCore.Mvc.JqGrid.Core.Request;
using Lib.AspNetCore.Mvc.JqGrid.Core.Response;
using Lib.AspNetCore.Mvc.JqGrid.Infrastructure.Enums;
using Lib.AspNetCore.Mvc.JqGrid.Infrastructure.Searching;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace APS.Web.Controllers
{
    [AuthorizationFilterAttribute]
    [HandleException]
    public class ApsClientController : Controller
    {
        private readonly ILogger<ApsClientController> _logger;
        private readonly IMasterService _masterService;
        private readonly HtmlEncoder _htmlEncoder;
        public ApsClientController(ILogger<ApsClientController> logger, IMasterService masterService, HtmlEncoder htmlEncoder)
        {
            this._logger = logger;
            this._masterService = masterService;
            this._htmlEncoder = htmlEncoder;
        }

        // GET: APSClient
        public ActionResult Index()
        {
          IEnumerable<LookupValuesModel>lookupValuesModels=  _masterService.GetMasterLookUpValues(CommonModel.commonentities.ConstantMessages.MasterConstant.Country);
            _logger.LogInformation("Country LookUp values taken");
            return View(lookupValuesModels);
        }
        [AcceptVerbs("POST")]
        public IActionResult jQGridDemo(JqGridRequest request, int? rowId)
        {
         
            var response = new 
            {
                TotalPagesCount = (int)Math.Ceiling((float)10 / (float)request.RecordsCount),
                PageIndex = request.PageIndex,
                TotalRecordsCount = 10,
                UserData = new
                {
                    Name = "Averages:",
                    Height ="100",
                    Weight = "200"
                }
            };

          
            return new JqGridJsonResult(response);
        }
        [AcceptVerbs("POST")]
        public IActionResult Characters(JqGridRequest request, int? rowId)
        {
            IList<ApsClientModel> apsClientList = new List<ApsClientModel>();
            apsClientList.Add(new ApsClientModel()
            {
                CompanyName = "ABC",
                Name="Dnyaneshwar",
                PowerOfAttorney =true,
                Email = "dnyaneshwar.Shivbhakta@silicus.com",
                AccountType = 1,
                OriginalAccountNumber = "1234567890",
                FundTo=1
            });

            apsClientList = FilterCharacters(apsClientList, request);

            int totalRecords = apsClientList.Count();

            JqGridResponse response = new JqGridResponse()
            {
                TotalPagesCount = (int)Math.Ceiling((float)totalRecords / (float)request.RecordsCount),
                PageIndex = request.PageIndex,
                TotalRecordsCount = totalRecords,
                UserData = apsClientList
            };

            //  apsClientList = SortCharacters(apsClientList, request.SortingName, request.SortingOrder);

            foreach (ApsClientModel character in apsClientList.Skip(request.PageIndex * request.RecordsCount).Take(request.PagesCount * request.RecordsCount))
            {
                response.Records.Add(new JqGridRecord(Convert.ToString(character.Id), character));
            }

            response.Reader.RepeatItems = false;

            return new JqGridJsonResult(response);
        }
        // GET: APSClient/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: APSClient/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: APSClient/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: APSClient/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: APSClient/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: APSClient/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: APSClient/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        #region Methods
        private IList<ApsClientModel> FilterCharacters(IList<ApsClientModel> queryableList, JqGridRequest request)
        {
            Func<ApsClientModel, bool> filterPredicate = null;

            if (request.Searching)
            {
                if (request.SearchingFilter != null)
                {
                    filterPredicate = GetCharacterSearchingFilterPredicate(request.SearchingFilter);
                }
                else if (request.SearchingFilters != null)
                {
                    filterPredicate = GetCharacterSearchingFiltersPredicate(request.SearchingFilters);
                }
            }

            return (filterPredicate == null) ? queryableList : queryableList.Where(character => filterPredicate(character)).ToList();
        }
        private Func<ApsClientModel, bool> GetCharacterSearchingFiltersPredicate(JqGridSearchingFilters searchingFilters)
        {
            Func<ApsClientModel, bool> searchingFiltersPredicate = null;
            IList<Func<ApsClientModel, bool>> searchingFilterPredicates = new List<Func<ApsClientModel, bool>>();

            foreach (JqGridSearchingFilter searchingFilter in searchingFilters.Filters)
            {
                searchingFilterPredicates.Add(GetCharacterSearchingFilterPredicate(searchingFilter));
            }

            foreach (JqGridSearchingFilters searchingFilterGroup in searchingFilters.Groups)
            {
                searchingFilterPredicates.Add(GetCharacterSearchingFiltersPredicate(searchingFilterGroup));
            }

            if (searchingFilterPredicates.Any())
            {
                if (searchingFilters.GroupingOperator == JqGridSearchGroupingOperators.And)
                {
                    searchingFiltersPredicate = (character => searchingFilterPredicates.All(searchingFilterPredicate => searchingFilterPredicate(character)));
                }
                else if (searchingFilters.GroupingOperator == JqGridSearchGroupingOperators.Or)
                {
                    searchingFiltersPredicate = (character => searchingFilterPredicates.Any(searchingFilterPredicate => searchingFilterPredicate(character)));
                }
            }

            return searchingFiltersPredicate;
        }

        private Func<ApsClientModel, bool> GetCharacterSearchingFilterPredicate(JqGridSearchingFilter searchingFilter)
        {
            Func<ApsClientModel, bool> searchingFilterPredicate = null;

            switch (searchingFilter.SearchingName.ToLowerInvariant())
            {
                case "name":
                    searchingFilterPredicate = GetCharacterNamePredicate(searchingFilter.SearchingOperator, searchingFilter.SearchingValue);
                    break;
                case "CompanyName":
                    searchingFilterPredicate = GetCharacterGenderPredicate(searchingFilter.SearchingOperator, searchingFilter.SearchingValue);
                    break;
            }

            return searchingFilterPredicate;
        }

        private Func<ApsClientModel, bool> GetCharacterNamePredicate(JqGridSearchOperators searchingOperator, string searchingValue)
        {
            Func<ApsClientModel, bool> namePredicate = null;

            switch (searchingOperator)
            {
                case JqGridSearchOperators.Eq:
                    namePredicate = (character => String.Compare(character.Name, searchingValue, StringComparison.OrdinalIgnoreCase) == 0);
                    break;
                case JqGridSearchOperators.Ne:
                    namePredicate = (character => String.Compare(character.Name, searchingValue, StringComparison.OrdinalIgnoreCase) != 0);
                    break;
                case JqGridSearchOperators.Bw:
                    namePredicate = (character => character.Name.StartsWith(searchingValue, StringComparison.OrdinalIgnoreCase));
                    break;
                case JqGridSearchOperators.Bn:
                    namePredicate = (character => !character.Name.StartsWith(searchingValue, StringComparison.OrdinalIgnoreCase));
                    break;
                case JqGridSearchOperators.Ew:
                    namePredicate = (character => character.Name.EndsWith(searchingValue, StringComparison.OrdinalIgnoreCase));
                    break;
                case JqGridSearchOperators.En:
                    namePredicate = (character => !character.Name.EndsWith(searchingValue, StringComparison.OrdinalIgnoreCase));
                    break;
                case JqGridSearchOperators.Cn:
                    namePredicate = (character => character.Name.IndexOf(searchingValue, StringComparison.OrdinalIgnoreCase) >= 0);
                    break;
                case JqGridSearchOperators.Nc:
                    namePredicate = (character => character.Name.IndexOf(searchingValue, StringComparison.OrdinalIgnoreCase) == -1);
                    break;
            }

            return namePredicate;
        }

        private Func<ApsClientModel, bool> GetCharacterGenderPredicate(JqGridSearchOperators searchingOperator, string searchingValue)
        {
            Func<ApsClientModel, bool> genderPredicate = null;
            if ((searchingOperator & JqGridSearchOperators.NullOperators) != 0)
            {
                switch (searchingOperator)
                {
                    case JqGridSearchOperators.Eq:
                        genderPredicate = (character => character.CompanyName == searchingValue);
                        break;
                    case JqGridSearchOperators.Ne:
                        genderPredicate = (character => character.CompanyName != searchingValue);
                        break;
                    case JqGridSearchOperators.Nu:
                        genderPredicate = (character => character.CompanyName==null);
                        break;
                    case JqGridSearchOperators.Nn:
                        genderPredicate = (character =>!string.IsNullOrWhiteSpace( character.CompanyName));
                        break;
                }
            }

            return genderPredicate;
        }

        //private IList<ApsClientModel> SortCharacters(IList<ApsClientModel> charactersQueryable, string sortingDefition, JqGridSortingOrders sortingOrder)
        //{
        //    IOrderedEnumerable<ApsClientModel> orderedCharacters = null;

        //    if (!String.IsNullOrWhiteSpace(sortingDefition))
        //    {
        //        sortingDefition = sortingDefition.ToLowerInvariant();

        //        string[] subSortingDefinitions = sortingDefition.Split(',');
        //        foreach (string subSortingDefinition in subSortingDefinitions)
        //        {
        //            string[] sortingDetails = subSortingDefinition.Trim().Split(' ');
        //            string sortingDetailsName = sortingDetails[0];
        //            JqGridSortingOrders sortingDetailsOrder = (sortingDetails.Length > 1) ? (JqGridSortingOrders)Enum.Parse(typeof(JqGridSortingOrders), sortingDetails[1], true) : sortingOrder;

        //            Func<ApsClientModel, object> sortingExpression = GetCharacterSortingExpression(sortingDetailsName, sortingDetailsOrder);

        //            if (sortingExpression != null)
        //            {
        //                if (orderedCharacters != null)
        //                {
        //                    orderedCharacters = (sortingDetailsOrder == JqGridSortingOrders.Asc) ? orderedCharacters.ThenBy(sortingExpression) : orderedCharacters.ThenByDescending(sortingExpression);
        //                }
        //                else
        //                {
        //                    orderedCharacters = (sortingDetailsOrder == JqGridSortingOrders.Asc) ? charactersQueryable.OrderBy(sortingExpression) : charactersQueryable.OrderByDescending(sortingExpression);
        //                }

        //            }
        //        }
        //    }

        //    return orderedCharacters.ToList();
        //}

        //private Func<ApsClientModel, object> GetCharacterSortingExpression(string sortingName, JqGridSortingOrders sortingOrder)
        //{
        //    Func<ApsClientModel, object> sortingExpression = null;

        //    //switch (sortingName)
        //    //{
        //    //    case "id":
        //    //        sortingExpression = (character => character.Id);
        //    //        break;
        //    //    case "name":
        //    //        sortingExpression = (character => character.Name);
        //    //        break;
        //    //    case "gender":
        //    //        sortingExpression = (character => (int?)character.Gender ?? ((sortingOrder == JqGridSortingOrders.Asc) ? Int32.MinValue : Int32.MaxValue));
        //    //        break;
        //    //    case "height":
        //    //        sortingExpression = (character => character.Height);
        //    //        break;
        //    //    case "weight":
        //    //        sortingExpression = (character => character.Weight ?? ((sortingOrder == JqGridSortingOrders.Asc) ? Int32.MaxValue : Int32.MinValue));
        //    //        break;
        //    //    case "birthyear":
        //    //        sortingExpression = (character => {
        //    //            decimal birthYear = (sortingOrder == JqGridSortingOrders.Asc) ? Int32.MaxValue : Int32.MinValue;

        //    //            if (!String.IsNullOrWhiteSpace(character.BirthYear))
        //    //            {
        //    //                if (character.BirthYear.EndsWith("BBY", StringComparison.OrdinalIgnoreCase))
        //    //                {
        //    //                    birthYear = (-1) * Convert.ToDecimal(character.BirthYear.Substring(0, character.BirthYear.Length - 3), CultureInfo.InvariantCulture);
        //    //                }
        //    //                else if (character.BirthYear.EndsWith("ABY", StringComparison.OrdinalIgnoreCase))
        //    //                {
        //    //                    birthYear = Convert.ToDecimal(character.BirthYear.Substring(0, character.BirthYear.Length - 3), CultureInfo.InvariantCulture);
        //    //                }
        //    //            }

        //    //            return birthYear;
        //    //        });
        //    //        break;
        //    //    default:
        //    //        break;
        //    //}

        //    return sortingExpression;
        //}

        #endregion
    }
}