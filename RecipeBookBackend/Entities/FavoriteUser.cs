namespace RecipeBookBackend.Entities
{
    public class FavoriteUser
    {
        public int FavoriteUserId { get; set; }
        public int UserId { get; set; }
        public int Id { get; set; }

        public User User { get; set; }
        public User Favorite { get; set; }
    }
}
