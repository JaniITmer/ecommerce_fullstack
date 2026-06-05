using EcommerceApi.Models;

namespace EcommerceApi.Repositories
{
    public interface ICartRepository
    {
        Task<IEnumerable<CartItem>> GetCartItemsByUserIdAsync(int userId);
        Task<CartItem?> GetCartItemAsync(int userId, int productId);
        Task<CartItem> AddToCartAsync(CartItem cartItem);
        Task<CartItem?> UpdateCartItemAsync(int cartItemId, int quantity);
        Task<bool> RemoveFromCartAsync(int cartItemId);
        Task<bool> ClearCartAsync(int userId);
    }
}
