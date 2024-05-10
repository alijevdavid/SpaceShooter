using RecipeBookBackend.Entities;
using static RecipeBookBackend.Entities.Recipe;
using System.Text.Json.Serialization;

namespace RecipeBookBackend.Dtos
{
    public class UserQueryModel
    {
        public UserQueryModel(User user, int[] recipeIDs)
        {
            Id = user.Id;
            Email = user.Email;
            Password = user.Password;
            FirstName = user.FirstName;
            LastName = user.LastName;
            UserName = user.UserName;
            Recipes = recipeIDs;
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; } = string.Empty;
        public IEnumerable<int>? Recipes { get; set; }
    }
}
