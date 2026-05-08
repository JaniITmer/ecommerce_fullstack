using EcommerceApi.DTOs.Category;
using EcommerceApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoriesController(ICategoryService service)
        {
                _service = service;
        }
        [HttpGet]

        public async Task<IActionResult> GetAll()
        {
            var categories = await _service.GetAllAsync();
            var result = categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name= c.Name,
                Description = c.Description,
                ProductCount=c.Products.Count

            });
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult>GetById(int id)
        {
            var category=await _service.GetByIdAsync(id);
            if(category==null) return NotFound();

            var result = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                ProductCount = category.Products.Count
            };
            return Ok(result);
        }
        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult>Create(CreateCategoryDto dto)
        {
            var category = new EcommerceApi.Models.Category
            {
                Name = dto.Name,
                Description = dto.Description
            };
            var created=await _service.CreateAsync(category);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);

        }

        [HttpPut("{id}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> Update(int id,UpdateCategoryDto dto)
        {
            var category = new EcommerceApi.Models.Category
            {
                Name = dto.Name,
                Description = dto.Description,
            };
            var updated = await _service.UpdateAsync(id, category);
            if(updated==null) return NotFound();
            return Ok(updated);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var result=await _service.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    } 
}