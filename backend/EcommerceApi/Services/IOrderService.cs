using EcommerceApi.DTOs.Order;

namespace EcommerceApi.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(int userId);
        Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(int userId);
        Task<OrderDto?> GetOrderByIdAsync(int userId, int orderId);
        Task<OrderDto?> UpdateOrderStatusAsync(int orderId, string status);
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();
    }
}
