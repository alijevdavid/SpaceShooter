using RecipeBookBackend.Entities;
using static Azure.Core.HttpHeader;
using static RecipeBookBackend.Entities.Recipe;

namespace RecipeBookBackend.Dtos
{
    public class IngredientQueryModel
    {
        public IngredientQueryModel(Ingredient ingredient)
        {
            Id = ingredient.Id;
            Name = ingredient.Name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
