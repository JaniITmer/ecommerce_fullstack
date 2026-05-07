using EcommerceApi.Repositories;
using EcommerceApi.Models;

namespace EcommerceApi.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }
        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }
        public async Task<Product> CreateAsync(Product product)
        {
            return await _repository.CreateAsync(product);
        }
        public async Task<Product?> UpdateAsync(int id, Product product)
        {
            return await _repository.UpdateAsync(id, product);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }




    }
}
