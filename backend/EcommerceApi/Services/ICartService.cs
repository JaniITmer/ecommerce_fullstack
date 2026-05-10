using EcommerceApi.DTOs.Cart;

namespace EcommerceApi.Services
{
    public interface ICartService
    {
        Task<CartDto> GetCartAsync(int userId);
        Task AddToCartAsync(int userId, AddToCartDto dto);
        Task UpdateCartItemAsync(int userId, int cartItemId, UpdateCartItemDto dto);
        Task RemoveFromCartAsync(int userId, int cartItemId);
        Task ClearCartAsync(int userId);

    }
}
