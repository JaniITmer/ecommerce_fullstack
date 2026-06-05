using EcommerceApi.DTOs.Cart;
using EcommerceApi.Models;
using EcommerceApi.Repositories;

namespace EcommerceApi.Services
{
    public class CartService:ICartService
    {

        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;

        public CartService(ICartRepository cartRepository, IProductRepository productRepository)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }


        public async Task<CartDto> GetCartAsync(int userId)
        {
            var cartItems = await _cartRepository.GetCartItemsByUserIdAsync(userId);

            var items = cartItems.Select(c => new CartItemDto
            {
                Id = c.Id,
                ProductId = c.ProductId,
                ProductName = c.Product!.Name,
                ProductPrice = c.Product.Price,
                ProductImageUrl = c.Product.ImageUrl,
                Quantity = c.Quantity,
                TotalPrice = c.Product.Price * c.Quantity
            }).ToList();

            return new CartDto
            {
                Items = items,
                TotalAmount = items.Sum(i => i.TotalPrice)
            };
        }
        public async Task AddToCartAsync(int userId, AddToCartDto dto)
        {
            var product = await _productRepository.GetByIdAsync(dto.ProductId);
            if (product == null)
                throw new Exception("Product not found!");

            if (product.Stock < dto.Quantity)
                throw new Exception("Not enough stock!");

            var existing = await _cartRepository.GetCartItemAsync(userId, dto.ProductId);
            if (existing != null)
            {
                await _cartRepository.UpdateCartItemAsync(existing.Id, existing.Quantity + dto.Quantity);
                return;
            }

            var cartItem = new CartItem
            {
                UserId = userId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity
            };

            await _cartRepository.AddToCartAsync(cartItem);
        }

        public async Task UpdateCartItemAsync(int userId, int cartItemId, UpdateCartItemDto dto)
        {
            if (dto.Quantity <= 0)
                throw new Exception("Quantity must be greater than 0!");
            var cartItems = await _cartRepository.GetCartItemsByUserIdAsync(userId);
            var cartItem = cartItems.FirstOrDefault(c => c.Id == cartItemId);
            if (cartItem == null)
                throw new Exception("Cart item not found!");
            await _cartRepository.UpdateCartItemAsync(cartItemId, dto.Quantity);
        }

        public async Task RemoveFromCartAsync(int userId, int cartItemId)
        {
            var cartItems = await _cartRepository.GetCartItemsByUserIdAsync(userId);
            var cartItem = cartItems.FirstOrDefault(c => c.Id == cartItemId);
            if (cartItem == null)
                throw new Exception("Cart item not found!");

            await _cartRepository.RemoveFromCartAsync(cartItemId);
        }

        public async Task ClearCartAsync(int userId)
        {
            await _cartRepository.ClearCartAsync(userId);
        }
    }
}
