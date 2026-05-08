using EcommerceApi.DTOs.Auth;
using EcommerceApi.Models;
using EcommerceApi.Repositories;

namespace EcommerceApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _repository;
        private readonly IJwtService _jwtService;

        public AuthService(IAuthRepository repository, IJwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }
        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            if (await _repository.EmailExistsAsync(dto.Email))
            {
                throw new Exception("Email already  exists!");
            }
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Customer"

            };

            var created = await _repository.CreateAsync(user);

            return new AuthResponseDto
            {
                Token = _jwtService.GenerateToken(created),
                Email = created.Email,
                FirstName = created.FirstName,
                Role = created.Role
            };

        }
        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _repository.GetByEmailAsync(dto.Email);
            if (user == null)
            {
                throw new Exception("Invalid email or password");

            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new Exception("Invalid email or password");

            return new AuthResponseDto
            {
                Token = _jwtService.GenerateToken(user),
                Email = user.Email,
                FirstName = user.FirstName,
                Role = user.Role

            };
        }





    }
}