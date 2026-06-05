using EcommerceApi.DTOs.Order;
using EcommerceApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder()
        {
            try
            {
                var userId = GetUserId();
                var order = await _orderService.CreateOrderAsync(userId);
                return CreatedAtAction(nameof(GetOrderById), new { orderId = order.Id }, order);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetMyOrders()
        {
            try
            {
                var userId = GetUserId();
                var orders = await _orderService.GetOrdersByUserIdAsync(userId);
                return Ok(orders);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderById(int orderId)
        {
            try
            {
                var userId = GetUserId();
                var order = await _orderService.GetOrderByIdAsync(userId, orderId);
                if (order == null) return NotFound();
                return Ok(order);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPut("{orderId}/status")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId,UpdateOrderStatusDto dto)
        {

            try
            {
                var order = await _orderService.UpdateOrderStatusAsync(orderId, dto.Status);
                if (order == null) return NotFound();
                return Ok(order);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);


            }
        }

        [HttpGet("all")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                var orders = await _orderService.GetAllOrdersAsync();
                return Ok(orders);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        
    }
}
