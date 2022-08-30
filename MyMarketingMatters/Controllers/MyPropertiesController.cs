using Microsoft.AspNetCore.Mvc;
using MyMarketingMatters.Services;

namespace MyMarketingMatters.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MyPropertiesController : ControllerBase
    {
        private readonly ILogger<MyPropertiesController> logger;
        private readonly ApiHandler apiHandler;

        public MyPropertiesController(ILogger<MyPropertiesController> logger,
            ApiHandler apiHandler)
        {
            this.logger = logger;
            this.apiHandler = apiHandler;
        }

        [HttpGet]
        public IEnumerable<MyProperty> Get()
        {
            var data = apiHandler.GetMyPropertiesAsync("ttr?agent=jtaylor@ttrsir.com&premium=0");
            var properties = new List<MyProperty>();
            properties.Add(new MyProperty()
            {
                Id = 1,
                Name = "Test"
            });
            return properties;
        }
    }
}