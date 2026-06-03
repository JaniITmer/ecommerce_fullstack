# 🛒 EcommerceApp

A full-stack e-commerce web application built with ASP.NET Core 10 and Next.js.
Developed as a portfolio project to demonstrate real-world backend and frontend skills.

## 🛠️Tech Stack 

**Backend:** C# · ASP.NET Core 10 · Entity Framework Core · PostgreSQL
**Frontend:** Next.js 15 · TypeScript · Tailwind CSS · Zustand
**Auth:** JWT · Role-based access control (Admin/Customer)
**API Docs:** Scalar (OpenAPI 3.1)
**Image Storage:** Cloudinary
**DevOps:** Docker · Docker Compose

## Features

### Customer
- 🔐 Register and login with JWT authentication
- 🛍️ Browse products with search and category filtering
- 🖼️ View product details with images
- 🛒 Add products to cart, update quantity, remove items
- 📦 Place orders from cart
- 📋 View order history with status tracking

### Admin
- 📁 Manage categories (create, edit, delete)
- 📦 Manage products with image upload (create, edit, delete)
- 📋 View all orders and update order status
- 🔒 Role-based access control (Admin/Customer)

### Technical
- ✅ Repository pattern and Service layer
- ✅ JWT authentication with role-based authorization
- ✅ Form validation with Zod
- ✅ Cloudinary image upload
- ✅ Docker containerization
- ✅ OpenAPI documentation with Scalar
- ✅ Automatic database migrations on startup
- 
## 🚀Getting Started

### Prerequisites
- Docker Desktop

### Setup

1. Clone the repository
   
   git clone https://github.com/JaniITmer/ecommerce_fullstack.git
   cd ecommerce_fullstack

2. Copy `.env.example` to `.env`
   
   cp .env.example .env

3. Fill in your own values in `.env`
```dotenv
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=ecommerce
JWT_SECRET_KEY=your_secret_key_minimum_32_chars
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
PGADMIN_EMAIL=your_pgadmin_email
PGADMIN_PASSWORD=your_pgadmin_password
```
4. Run the application
   
 ```bash
docker-compose up --build
```

## 🌐 Access

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API | http://localhost:8080 |
| API Docs | http://localhost:8080/scalar/v1 |
| pgAdmin | http://localhost:5050 |

## 👤 Default Admin Setup

1. Register a new user at http://localhost:3000/auth/register
2. Open pgAdmin at http://localhost:5050
3. Navigate to **ecommerce → Schemas → public → Tables → Users**
4. Change the `role` field to `Admin`
5. Login at http://localhost:3000/auth/login

## 📁 Project Structure

    ecommerce_fullstack/
    ├── backend/
    │   └── EcommerceApi/
    │       ├── Controllers/     # API endpoints
    │       ├── Services/        # Business logic
    │       ├── Repositories/    # Database operations
    │       ├── Models/          # Database entities
    │       ├── DTOs/            # Data transfer objects
    │       └── Data/            # DbContext
    ├── frontend/
    │   └── app/
    │       ├── products/        # Product pages
    │       ├── cart/            # Cart page
    │       ├── orders/          # Orders page
    │       ├── auth/            # Login/Register
    │       ├── admin/           # Admin panel
    │       ├── components/      # Shared components
    │       ├── store/           # Zustand store
    │       ├── lib/             # API client
    │       └── types/           # TypeScript types
    ├── docker-compose.yml
    └── .env.example
MVP Complete
## 🚧 Future Improvements

- [ ] Product reviews and ratings
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Wishlist functionality
- [ ] Product pagination
- [ ] Unit and integration tests

## 📊 Project Status

✅ MVP Complete

## Author

János Nagy — [LinkedIn](www.linkedin.com/in/itjanosnagy) · [GitHub](https://github.com/JaniITmer)
