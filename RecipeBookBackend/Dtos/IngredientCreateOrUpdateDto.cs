using RecipeBookBackend.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RecipeBookBackend.Dtos
{
    public class IngredientCreateOrUpdateDto
    {
        public string Name { get; set; }

        public string? IngredientEn { get; set; }
    }
}
