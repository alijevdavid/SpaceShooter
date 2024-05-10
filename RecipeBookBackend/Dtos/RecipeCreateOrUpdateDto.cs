using static RecipeBookBackend.Entities.Recipe;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RecipeBookBackend.Dtos
{
    public class RecipeCreateOrUpdateDto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string ImageLink { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RecipeType recipeType { get; set; }
    }
}
