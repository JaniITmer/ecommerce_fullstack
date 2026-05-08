using EcommerceApi.Models;

namespace EcommerceApi.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
