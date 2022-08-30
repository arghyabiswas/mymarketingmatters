using Microsoft.AspNetCore.Mvc;

namespace MyMarketingMatters.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MyPropertiesController : ControllerBase
    {
        private readonly ILogger<MyPropertiesController> logger;

        public MyPropertiesController(ILogger<MyPropertiesController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        public IEnumerable<MyProperty> Get()
        {
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