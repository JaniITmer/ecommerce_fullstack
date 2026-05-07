using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace EcommerceApi.DTOs.Category
{
    public class UpdateCategoryDto
    {
        public string Name { get; set; }=string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
