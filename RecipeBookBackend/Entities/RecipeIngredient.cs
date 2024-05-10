﻿namespace RecipeBookBackend.Entities
{
    public class RecipeIngredient
    {
        public int Id { get; set; }

        public int RecipeId { get; set; }

        public Recipe Recipe { get; set; } = null!;

        public int IngredientId { get; set; }

        public Ingredient Ingredient { get; set; } = null!;
    }
}
