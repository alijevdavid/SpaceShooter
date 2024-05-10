using RecipeBookBackend.Entities;
using static RecipeBookBackend.Entities.Recipe;
using System.Text.Json.Serialization;

namespace RecipeBookBackend.Dtos
{
    public class RecipeQueryModel
    {
        public RecipeQueryModel(Recipe recipe, int[] ingredientIDs)
        {
            Id = recipe.Id;
            Name = recipe.Name;
            ShortDescription = recipe.ShortDescription;
            LongDescription = recipe.LongDescription;
            NameEn = recipe.NameEn;
            ShortDescriptionEn = recipe.ShortDescriptionEn;
            LongDescriptionEn = recipe.LongDescriptionEn;
            ImageLink = recipe.ImageLink;
            recipeType = recipe.recipeType;
            Ingredients = ingredientIDs;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string? NameEn { get; set; }
        public string ShortDescription { get; set; }
        public string? ShortDescriptionEn { get; set; }
        public string LongDescription { get; set; }
        public string? LongDescriptionEn { get; set; }
        public string ImageLink { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RecipeType recipeType { get; set; }
        public IEnumerable<int>? Ingredients { get; set; }
    }
}
