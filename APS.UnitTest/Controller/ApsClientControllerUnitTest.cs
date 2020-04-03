using APS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Encodings.Web;

namespace APS.UnitTest.Controller
{
    [TestClass]
    public class ApsClientControllerUnitTest
    {
        private readonly ApsClientController apsClientController;
        private readonly ILogger<ApsClientController> logger;
        private readonly HtmlEncoder encode;
        public ApsClientControllerUnitTest()
        {
            logger = new Mock<ILogger<ApsClientController>>().Object;
            encode = new Mock<HtmlEncoder>().Object;
            apsClientController = new ApsClientController(logger, Initializer.MockMasterService.Object, encode);
        }
        #region Test Constructor
        [TestMethod]
        public void Test_ApsClientController()
        {
            ApsClientController tstController= new ApsClientController(logger, Initializer.MockMasterService.Object, encode);
            Assert.IsNotNull(tstController);
        }
        [TestMethod]
        public void Test_MasterCountryData()
        {
            var response =  apsClientController.Index() as ViewResult;
            Assert.IsNotNull(response.Model);
        }
        #endregion
    }
}
