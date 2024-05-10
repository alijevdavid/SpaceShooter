using Microsoft.AspNetCore.Mvc;
using RecipeBookBackend.Entities;
using RecipeBookBackend.Services;
using Microsoft.EntityFrameworkCore;
using RecipeBookBackend.Dtos;
using System.Drawing.Printing;

namespace RecipeBookBackend.Controllers
{
    [Route("api/recipes")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly RecipeBookDbContext _context;
        private readonly TranslationService service = new TranslationService();

        public RecipeController(RecipeBookDbContext _context)
        {
            this._context = _context;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> getRecipes()
        {
            var recipeQueryList = await _context.Recipes.OrderBy(d => d.Id).
                Select(r => new RecipeQueryModel(r, r.RecipeIngredients.Select(ri => ri.IngredientId).ToArray())).ToListAsync();
            return Ok(recipeQueryList);
        }

        [HttpGet("get/{recipeId}", Name = "getRecipeById")]
        public async Task<IActionResult> getRecipeById(int recipeId)
        {
            var recipe = await _context.Recipes
                .Select(r => new { Recipe = r, ingredientIDs = r.RecipeIngredients.Select(ri => ri.IngredientId) })
                .SingleOrDefaultAsync(x => x.Recipe.Id == recipeId);
            if (recipe == null)
            {
                return NotFound();
            }

            return Ok(new RecipeQueryModel(recipe.Recipe, recipe.ingredientIDs.ToArray()));
        }

        [HttpGet("recipe/{recipeId}/user")]
        public IActionResult GetUserByRecipe(int recipeId)
        {
            var userRecipe = _context.UserRecipes.Include(ur => ur.User)
                                                .FirstOrDefault(ur => ur.RecipeId == recipeId);

            if (userRecipe == null)
            {
                return NotFound("User for this recipe not found.");
            }

            var user = userRecipe.User;

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        [HttpPost]
        [Route("new")]
        [ProducesResponseType(typeof(void), StatusCodes.Status201Created)]
        public IActionResult CreateRecipe([FromBody] RecipeCreateOrUpdateDto recipeDto, [FromQuery] int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var newRecipe = new Recipe(recipeDto.Name, recipeDto.LongDescription, recipeDto.ShortDescription, recipeDto.ImageLink, recipeDto.recipeType);

            newRecipe.NameEn = service.translateTextAsync("hu", "en", newRecipe.Name).Result;
            newRecipe.ShortDescriptionEn = service.translateTextAsync("hu", "en", newRecipe.ShortDescription).Result;
            newRecipe.LongDescriptionEn = service.translateTextAsync("hu", "en", newRecipe.LongDescription).Result;

            var userRecipe = new UserRecipe
            {
                User = user,
                Recipe = newRecipe
            };

            _context.UserRecipes.Add(userRecipe);
            _context.SaveChanges();

            return CreatedAtRoute(
                routeName: "getRecipeById",
                routeValues: new { recipeId = newRecipe.Id },
                value: newRecipe);
        }

        [HttpPut("edit/{id:int}")]
        public async Task<ActionResult<Recipe>> UpdateRecipe(int id, Recipe recipe)
        {
            try
            {
                if (id != recipe.Id)
                    return BadRequest("Recipe ID mismatch");

                _context.Recipes.Update(recipe);
                await _context.SaveChangesAsync();
                _context.Entry(recipe).State = EntityState.Modified;
                return Ok(recipe);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        [HttpDelete]
        [Route("delete/{Id}")]
        public async Task<IActionResult> deleteRecipeById(int Id)
        {
            try
            {
                var recipe = _context.Recipes.FirstOrDefault(r => r.Id == Id);
                if (recipe == null)
                {
                    return NotFound();
                }
                _context.Recipes.Remove(recipe);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
