using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeBookBackend.Migrations
{
    /// <inheritdoc />
    public partial class initialRecipeBook9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LongDescriptionEn",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShortDescriptionEn",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "recipeType",
                table: "Recipes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "IngredientEn",
                table: "Ingredients",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LongDescriptionEn",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "ShortDescriptionEn",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "recipeType",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "IngredientEn",
                table: "Ingredients");
        }
    }
}
