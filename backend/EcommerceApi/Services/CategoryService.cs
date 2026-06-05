using EcommerceApi.Models;
using EcommerceApi.Repositories;

namespace EcommerceApi.Services
{
    public class CategoryService :ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }
        public async Task<Category?>GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }
        public async Task<Category> CreateAsync(Category category)
        {
            return await _repository.CreateAsync(category);
        }
        public async Task<Category?> UpdateAsync(int id, Category category)
        {
            return await _repository.UpdateAsync(id, category);
        }
        public async Task<bool>DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

    }
}
