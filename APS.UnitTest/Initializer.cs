using APS.Domain.DBModels;
using APS.Repository;
using APS.Repository.repositories;
using APS.Service.services;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Text;

namespace APS.UnitTest
{
    [TestClass]
    public class Initializer
    {
        public static HttpClient TestHttpClient;
        public static Mock<APSContext> MockApsContext;
        public static Mock<IConfiguration> MockIConfiguration;

        //Master         
        public static GenericRepository<LookupType> MockLookupRepository;
        public static GenericRepository<LookupValues> MockLookupValueRepository;
        public static Mock<MasterRepository> MockMasterRepository;
        public static Mock<MasterService> MockMasterService;
        public static Mock<IMapper> MockMapper;



        [AssemblyInitialize]
        public static void InitializeTestServer(TestContext testContext)
        {
            var testServer = new TestServer(new WebHostBuilder()
               .UseStartup<Startup>()
               // this would cause it to use StartupIntegrationTest class
               // or ConfigureServicesIntegrationTest / ConfigureIntegrationTest
               // methods (if existing)
               // rather than Startup, ConfigureServices and Configure
               .UseEnvironment("Development"));

            TestHttpClient = testServer.CreateClient();
        }

        [ClassInitialize]
        public static void TestFixtureSetup(TestContext context)
        {
            // Executes once for the test class. (Optional)
        }

        [TestInitialize]
        public void Setup()
        {
            // Runs before each test. (Optional)
        }

        [AssemblyCleanup]
        public static void AssemblyCleanup()
        {
            // Executes once after the test run. (Optional)
        }

        [ClassCleanup]
        public static void TestFixtureTearDown()
        {
            // Runs once after all tests in this class are executed. (Optional)
            // Not guaranteed that it executes instantly after all tests from the class.
        }

        [TestCleanup]
        public void TearDown()
        {
            // Runs after each test. (Optional)
        }

        public static void RegisterMockRepositories(IServiceCollection services)
        {
            var dbContext = services.BuildServiceProvider().GetRequiredService<APSContext>();
            DbContextExtensions.Seed(dbContext); //Initial data preparation 


            //Master
            MockLookupRepository = (new GenericRepository<LookupType>(dbContext));
            services.AddSingleton(MockLookupRepository);
            MockMasterRepository = (new Mock<MasterRepository>(MockBehavior.Default, dbContext));
            services.AddSingleton(MockMasterRepository.Object);
            MockLookupValueRepository = (new GenericRepository<LookupValues>(dbContext));
            services.AddSingleton(MockLookupRepository);
            MockMapper= new Mock<IMapper>();
            MockMasterService = (new Mock<MasterService>(MockBehavior.Strict, MockLookupRepository,MockLookupValueRepository, MockMapper.Object,MockMasterRepository.Object));
            services.AddSingleton(MockMasterService.Object);
            
            MockIConfiguration = new Mock<IConfiguration>();         
            //add more mock repositories below
        }
      
    }
}
