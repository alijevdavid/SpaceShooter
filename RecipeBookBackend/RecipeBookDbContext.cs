namespace RecipeBookBackend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Reflection.Metadata;
using static RecipeBookBackend.Entities.Recipe;

public class RecipeBookDbContext : DbContext
{
    public RecipeBookDbContext(DbContextOptions<RecipeBookDbContext> options) : base(options)
    {
        
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Recipe> Recipes => Set<Recipe>();

    public DbSet<Ingredient> Ingredients => Set<Ingredient>();

    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();

    public DbSet<UserRecipe> UserRecipes => Set<UserRecipe>();

    public DbSet<FavoriteUser> FavoriteUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(user =>
        {
            user.Property(t => t.UserName)
                .HasMaxLength(50);
            user.HasIndex(t => t.UserName);
        });

        modelBuilder.Entity<RecipeIngredient>()
            .HasKey(ri => new { ri.RecipeId, ri.IngredientId });

        modelBuilder.Entity<RecipeIngredient>()
            .HasOne(ri => ri.Recipe)
            .WithMany(r => r.RecipeIngredients)
            .HasForeignKey(ri => ri.RecipeId);

        modelBuilder.Entity<UserRecipe>()
            .HasKey(ur => new { ur.UserId, ur.RecipeId });

        modelBuilder.Entity<UserRecipe>()
            .HasOne(ur => ur.User)
            .WithMany(u => u.UserRecipes)
            .HasForeignKey(ur => ur.UserId);

        modelBuilder.Entity<FavoriteUser>()
            .HasKey(fu => new { fu.UserId, fu.Id });

        modelBuilder.Entity<FavoriteUser>()
            .HasOne(fu => fu.User)
            .WithMany(u => u.FavoriteUsers)
            .HasForeignKey(fu => fu.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<FavoriteUser>()
            .HasOne(fu => fu.Favorite)
            .WithMany()
            .HasForeignKey(fu => fu.Id)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
