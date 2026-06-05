namespace EcommerceApi.DTOs.Cart
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal ProductPrice { get; set; }
        public string ProductImageUrl { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }

    public class CartDto
    {
        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();
        public decimal TotalAmount { get; set; }

    }
    public class AddToCartDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }

    }
    public class UpdateCartItemDto
    {
        public int Quantity { get; set; }
    }
}
