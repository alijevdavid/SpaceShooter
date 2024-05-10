using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using RecipeBookBackend.Dtos;
using RecipeBookBackend.Entities;
using RecipeBookBackend.Services;

namespace RecipeBookBackend.Controllers
{
    [Route("api/ingredients")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly RecipeBookDbContext _context;
        private readonly TranslationService service = new TranslationService();

        public IngredientController(RecipeBookDbContext _context)
        {
            this._context = _context;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetIngredients()
        {
            return Ok(_context.Ingredients);
        }

        [HttpGet("get/{ingredientId}", Name = "getIngredientById")]
        public async Task<IActionResult> getIngredientById( int ingredientId)
        {
            var ingredient = await _context.Ingredients
                .Select(i => new { Ingredient = i})
                .SingleOrDefaultAsync(x => x.Ingredient.Id == ingredientId);
            if (ingredient == null)
            {
                return NotFound();
            }

            return Ok(ingredient.Ingredient);
        }

        [HttpPost]
        [Route("new")]
        public IActionResult CreateIngredient([FromBody] IngredientCreateOrUpdateDto ingredientDto, [FromQuery] int recipeId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recipe = _context.Recipes.FirstOrDefault(r => r.Id == recipeId);
            if (recipe == null)
            {
                return NotFound("Recipe not found");
            }

            var newIngredient = new Ingredient(ingredientDto.Name);
            newIngredient.IngredientEn = service.translateTextAsync("hu", "en", newIngredient.ToString()).Result;

            var recipeIngredient = new RecipeIngredient
            {
                Recipe = recipe,
                Ingredient = newIngredient
            };

            _context.RecipeIngredients.Add(recipeIngredient);
            _context.SaveChanges();

            return CreatedAtRoute(
                routeName: nameof(this.getIngredientById),
                routeValues: new { ingredientId = newIngredient.Id },
                value: newIngredient);
        }

        [HttpDelete]
        [Route("delete/{Id}")]
        public async Task<IActionResult> deleteIngredientById(int Id)
        {
            try
            {
                var ingredient = _context.Ingredients.FirstOrDefault(r => r.Id == Id);
                if (ingredient == null)
                {
                    return NotFound();
                }
                _context.Ingredients.Remove(ingredient);
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
