using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using RecipeBookBackend.Tools;

namespace RecipeBookBackend.Entities
{
    public class Recipe
    {
        public enum RecipeType
        {
            Vegetáriánus,
            Vegán,
            Laktózmentes,
            Gluténmentes,
            [Display(Name = "Laktóz és Gluténmentes")]
            LaktózmentesÉsGluténmentes,
            [Display(Name = "Egyik Se")]
            EgyikSe,
            Összes
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        public ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();

        public Recipe(string name, string longDescription, string shortDescription,string imageLink,RecipeType recipeType)
        {
            this.Name = name;
            this.LongDescription = longDescription;
            this.ShortDescription = shortDescription;
            this.ImageLink = imageLink;
            this.recipeType = recipeType;

        }
    }
}
