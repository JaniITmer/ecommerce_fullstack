using EcommerceApi.Models;

namespace EcommerceApi.Repositories
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int  userId);
        Task<Order?> GetOrderByIdAsync(int orderId);
        Task <Order>CreateOrderAsync(Order order);
        Task<Order?>UpdateOrderStatusAsync(int  orderId,string status);
        Task<IEnumerable<Order>> GetAllOrdersAsync();

    }
}
