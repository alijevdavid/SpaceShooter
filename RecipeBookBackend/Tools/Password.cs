using System.Security.Cryptography;
using System.Text;

namespace RecipeBookBackend.Tools
{
    public class Password
    {
        public static string hashPassword(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashedPassw = sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashedPassw);
        }
    }
}
