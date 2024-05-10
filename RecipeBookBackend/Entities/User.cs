using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RecipeBookBackend.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; } = string.Empty;
        public ICollection<UserRecipe> UserRecipes{ get; set; } = new List<UserRecipe>();

        public ICollection<FavoriteUser> FavoriteUsers { get; set; } = new List<FavoriteUser>();

        public User(string email, string password, string userName, string firstName, string lastName)
        {
            this.Email = email;
            this.Password = password;
            this.UserName = userName;
            this.FirstName = firstName;
            this.LastName = lastName;
        }
    }
}
