using System.Net.Http.Headers;

namespace MyMarketingMatters.Services
{
    public class ApiHandler
    {
        private readonly HttpClient client;
        public ApiHandler()
        {
            this.client = new HttpClient();
            client.BaseAddress = new Uri("https://api.mymarketingmatters.com/");
            //client.DefaultRequestHeaders.Accept.Clear();
            //client.DefaultRequestHeaders.Accept.Add(
            //    new MediaTypeWithQualityHeaderValue("application/json"));
        }
        public async Task<IList<MyProperty>> GetMyPropertiesAsync(string path)
        {
            List<MyProperty> properties = null;
            HttpResponseMessage response = await client.GetAsync(path);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
            }
            return properties;
        }
    }
}
