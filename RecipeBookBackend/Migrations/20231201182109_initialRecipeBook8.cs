using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeBookBackend.Migrations
{
    /// <inheritdoc />
    public partial class initialRecipeBook8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Recipes",
                newName: "ShortDescription");

            migrationBuilder.AddColumn<string>(
                name: "ImageLink",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LongDescription",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageLink",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "LongDescription",
                table: "Recipes");

            migrationBuilder.RenameColumn(
                name: "ShortDescription",
                table: "Recipes",
                newName: "Description");
        }
    }
}
