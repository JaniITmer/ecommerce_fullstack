using EcommerceApi.Models;

namespace EcommerceApi.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task<Category>CreateAsync(Category category);
        Task<Category?> UpdateAsync(int ud, Category category);
        Task<bool> DeleteAsync(int id);

    }
}
