using Microsoft.AspNetCore.Identity;

namespace ProjectOrryxPrime.FunctionalAreas
{
    public class PasswordHashManager
    {
        private readonly PasswordHasher<object> _hasher = new PasswordHasher<object>();
        private readonly object _dummyUser = null;

        public string HashPassword(string password)
        {
            return _hasher.HashPassword(_dummyUser, password);
        }

        public bool VerifyPassword(string hashedPassword, string inputPassword)
        {
            var result = _hasher.VerifyHashedPassword(_dummyUser, hashedPassword, inputPassword);
            return result == PasswordVerificationResult.Success;
        }

    }
}
