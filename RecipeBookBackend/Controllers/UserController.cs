using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeBookBackend.Dtos;
using RecipeBookBackend.Entities;
using RecipeBookBackend.Tools;
using System.Diagnostics;
using System.Net;

namespace RecipeBookBackend
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly RecipeBookDbContext _context;

        public UserController(RecipeBookDbContext _context)
        {
            this._context = _context;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> getUsers()
        {
            var userQueryList = await _context.Users.OrderBy(u => u.Id).
                Select(u => new UserQueryModel(u, u.UserRecipes.Select(ur => ur.RecipeId).ToArray())).ToListAsync();
            return Ok(userQueryList);
        }

        [HttpGet("get/{userId}", Name = "getUserById")]
        public async Task<IActionResult> getUserById(int userId)
        {
            var user = await _context.Users
                .Select(u => new { User = u, recipeIDs = u.UserRecipes.Select(ur => ur.RecipeId) })
                .SingleOrDefaultAsync(x => x.User.Id == userId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new UserQueryModel(user.User, user.recipeIDs.ToArray()));
        }

        [HttpDelete]
        [Route("delete/{Id}")]
        public async Task<IActionResult> DeleteUserById(int Id)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Id == Id);
                if (user == null)
                {
                    return NotFound();
                }
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> userLoginAsync([FromBody] User user)
        {
            try
            {
                String password = Password.hashPassword(user.Password);
                var dbUser = await _context.Users.Where(u => ((u.UserName == user.UserName) || (u.Email == user.Email)) && u.Password == password).FirstOrDefaultAsync();

                if (dbUser == null)
                {
                    var error = new { message = "Email/Username or password is incorrect" };
                    return BadRequest(error);
                }

                return Ok(dbUser);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("registration")]
        [ProducesResponseType(typeof(void), StatusCodes.Status201Created)]
        public async Task<IActionResult> userRegistrationAsync([FromBody] User user)
        {
            try
            {
                var dbUser = await _context.Users.Where(u => (u.UserName == user.UserName) || (u.Email.Equals(user.Email))).FirstOrDefaultAsync();

                if (dbUser != null)
                {
                    var error = new { message = "Username/E-Mail already taken" };
                    return BadRequest(error);
                }

                var newUser = new User(user.Email, Password.hashPassword(user.Password), user.UserName, user.FirstName, user.LastName);

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                return CreatedAtRoute(
                    routeName: "getUserById",
                    routeValues: new { userId = newUser.Id },
                    value: newUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Endpoint to add a favorite user for a specific user
        [HttpPost("{userId}/favorite/{favoriteUserId}")]
        public IActionResult AddFavoriteUser(int userId, int favoriteUserId)
        {
            var user = _context.Users.Include(u => u.FavoriteUsers).FirstOrDefault(u => u.Id == userId);
            var favoriteUser = _context.Users.FirstOrDefault(u => u.Id == favoriteUserId);

            if (user == null || favoriteUser == null)
            {
                return NotFound();
            }

            if(favoriteUser == user)
            {
                return BadRequest("You can not be yourselves favorite!");
            }

            if (user.FavoriteUsers.Any(fu => fu.Id == favoriteUserId))
            {
                return BadRequest("This user is already a favorite.");
            }

            user.FavoriteUsers.Add(new FavoriteUser { UserId = userId, Id = favoriteUserId });
            _context.SaveChanges();

            return Ok();
        }

        // Endpoint to retrieve favorite user of a specific user
        [HttpGet("{userId}/favorites")]
        public IActionResult GetFavoriteUsers(int userId)
        {
            var user = _context.Users.Include(u => u.FavoriteUsers).ThenInclude(fu => fu.Favorite)
                                      .FirstOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            var favoriteUser = user.FavoriteUsers.Select(fu => fu.Favorite);
            return Ok(favoriteUser);
        }

        // Endpoint to check if a user is a favorite of any other users and get the list
        [HttpGet("{userId}/isfavorite")]
        public IActionResult CheckIsFavorite(int userId)
        {
            var user = _context.Users.Include(u => u.FavoriteUsers)
                                      .FirstOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            var usersWhoFavorited = _context.FavoriteUsers.Include(fu => fu.User)
                                                          .Where(fu => fu.Id == userId)
                                                          .Select(fu => fu.User)
                                                          .ToList();

            if (usersWhoFavorited.Count == 0)
            {
                return Ok("Noone likes this user");
            }

            return Ok(usersWhoFavorited);
        }

        // Endpoint to remove a favorite user for a specific user
        [HttpDelete("{userId}/favorite/{favoriteUserId}")]
        public IActionResult RemoveFavoriteUser(int userId, int favoriteUserId)
        {
            var user = _context.Users.Include(u => u.FavoriteUsers)
                                      .FirstOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            var favoriteToRemove = user.FavoriteUsers.FirstOrDefault(fu => fu.Id == favoriteUserId);

            if (favoriteToRemove == null)
            {
                return BadRequest("This user is not in favorites.");
            }

            _context.FavoriteUsers.Remove(favoriteToRemove);
            _context.SaveChanges();

            return Ok();
        }
    }
}
