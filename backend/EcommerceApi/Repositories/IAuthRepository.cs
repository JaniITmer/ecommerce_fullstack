using EcommerceApi.Models;

namespace EcommerceApi.Repositories
{
    public interface IAuthRepository
    {

        Task<User?>GetByEmailAsync(string email);
        Task<User> CreateAsync(User user);
        Task<bool> EmailExistsAsync(string email);
    }
}
