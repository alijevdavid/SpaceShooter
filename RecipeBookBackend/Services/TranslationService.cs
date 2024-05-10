using Newtonsoft.Json;
using RecipeBookBackend.Tools;

namespace RecipeBookBackend.Services
{
    public class TranslationService
    {
        public async Task<string> translateTextAsync(string from, string to, string text)
        {
            using (HttpClient client = new HttpClient())
            {
                string apiUrl = "http://localhost:5000/translate";

                var requestData = new
                {
                    q = text,
                    source = from,
                    target = to,
                    format = "text",
                    api_key = ""
                };

                var content = new StringContent(System.Text.Json.JsonSerializer.Serialize(requestData), System.Text.Encoding.UTF8, "application/json");

                var response = await client.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    TranslationResponse? translationResponse = JsonConvert.DeserializeObject<TranslationResponse>(jsonResponse);

                    if (translationResponse != null)
                    {
                        return translationResponse.translatedText;

                    }
                    else
                    {
                        return "Error: " + response.StatusCode;
                    }
                }
                else
                {
                    return "Error: " + response.StatusCode;
                }
            }
        }
    }
}
