using EcommerceApi.DTOs.Order;
using EcommerceApi.Models;
using EcommerceApi.Repositories;

namespace EcommerceApi.Services
{
    public class OrderService:IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;


        public OrderService(IOrderRepository orderRepository,ICartRepository cartRepository, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }

        public async Task<OrderDto> CreateOrderAsync(int userId)
        {
            var cartItems=await _cartRepository.GetCartItemsByUserIdAsync(userId);
            if (!cartItems.Any())
                throw new Exception("Cart is empty!");

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                Status = "Pending",
                TotalAmount = cartItems.Sum(c => c.Product!.Price * c.Quantity),
                OrderItems = cartItems.Select(c => new OrderItem
                {
                    ProductId = c.ProductId,
                    Quantity = c.Quantity,
                    UnitPrice = c.Product!.Price

                }).ToList()

            };
            foreach (var item in cartItems)
            {
                var product = await _productRepository.GetByIdAsync(item.ProductId);
                if (product != null)
                {
                    product.Stock -= item.Quantity;
                }
            }
            var created = await _orderRepository.CreateOrderAsync(order);
            await _cartRepository.ClearCartAsync(userId);

            return MapToDto(created);
        }
        public async Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(int userId)
        {
            var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);
            return orders.Select(MapToDto);
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int userId, int orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if (order == null || order.UserId != userId) return null;
            return MapToDto(order);
        }


        public async Task<OrderDto?> UpdateOrderStatusAsync(int orderId, string status)
        {
            var order = await _orderRepository.UpdateOrderStatusAsync(orderId, status);
            if (order == null) return null;
            return MapToDto(order);
        }


        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _orderRepository.GetAllOrdersAsync();
            return orders.Select(MapToDto);
        }

        private OrderDto MapToDto(Order order)
        {
            return new OrderDto
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                Status = order.Status,
                TotalAmount = order.TotalAmount,
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product?.Name ?? "Unknown",
                    UnitPrice = oi.UnitPrice,
                    Quantity = oi.Quantity,
                    TotalPrice = oi.UnitPrice * oi.Quantity
                }).ToList()
            };
        }
    }
}
