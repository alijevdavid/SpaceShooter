using System.Text.Json.Serialization;

namespace RecipeBookBackend.Entities
{
    public class UserRecipe
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; } = null!;

        public int RecipeId { get; set; }

        public Recipe Recipe { get; set; } = null!;
    }
}
