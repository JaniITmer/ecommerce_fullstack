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

## 📡 API Endpoints

### 🔐 Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login and get JWT token | ❌ |

**Register example:**
```json
POST /api/auth/register
{
  "firstName": "János",
  "lastName": "Nagy",
  "email": "janos@email.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "janos@email.com",
  "firstName": "János",
  "role": "Customer"
}
```

---

### 🛍️ Products
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | Get all products | ❌ |
| GET | `/api/products/{id}` | Get product by ID | ❌ |
| POST | `/api/products` | Create product | 🔒 Admin |
| PUT | `/api/products/{id}` | Update product | 🔒 Admin |
| DELETE | `/api/products/{id}` | Delete product | 🔒 Admin |

**Get all products response:**
```json
[
  {
    "id": 1,
    "name": "Samsung TV",
    "description": "TV with Android",
    "price": 200000,
    "imageUrl": "https://res.cloudinary.com/...",
    "categoryName": "Electronics",
    "inStock": true
  }
]
```

**Create product example:**
```json
POST /api/products
Authorization: Bearer {token}
{
  "name": "Samsung TV",
  "description": "TV with Android",
  "price": 200000,
  "stock": 10,
  "imageUrl": "https://res.cloudinary.com/...",
  "categoryId": 1
}
```

---

### 📁 Categories
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/categories` | Get all categories | ❌ |
| GET | `/api/categories/{id}` | Get category by ID | ❌ |
| POST | `/api/categories` | Create category | 🔒 Admin |
| PUT | `/api/categories/{id}` | Update category | 🔒 Admin |
| DELETE | `/api/categories/{id}` | Delete category | 🔒 Admin |

**Get all categories response:**
```json
[
  {
    "id": 1,
    "name": "Electronics",
    "description": "Electronic products",
    "productCount": 5
  }
]
```

---

### 🛒 Cart
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/cart` | Get current user cart | 🔒 Customer |
| POST | `/api/cart` | Add item to cart | 🔒 Customer |
| PUT | `/api/cart/{cartItemId}` | Update item quantity | 🔒 Customer |
| DELETE | `/api/cart/{cartItemId}` | Remove item from cart | 🔒 Customer |
| DELETE | `/api/cart/clear` | Clear cart | 🔒 Customer |

**Add to cart example:**
```json
POST /api/cart
Authorization: Bearer {token}
{
  "productId": 1,
  "quantity": 2
}
```

**Cart response:**
```json
{
  "items": [
    {
      "id": 1,
      "productId": 1,
      "productName": "Samsung TV",
      "productPrice": 200000,
      "quantity": 2,
      "totalPrice": 400000
    }
  ],
  "totalAmount": 400000
}
```

---

### 📦 Orders
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/orders` | Get my orders | 🔒 Customer |
| GET | `/api/orders/{id}` | Get order by ID | 🔒 Customer |
| POST | `/api/orders` | Place order from cart | 🔒 Customer |
| GET | `/api/orders/all` | Get all orders | 🔒 Admin |
| PUT | `/api/orders/{id}/status` | Update order status | 🔒 Admin |

**Place order response:**
```json
{
  "id": 1,
  "orderDate": "2026-06-03T10:00:00Z",
  "status": "Pending",
  "totalAmount": 400000,
  "items": [
    {
      "productName": "Samsung TV",
      "unitPrice": 200000,
      "quantity": 2,
      "totalPrice": 400000
    }
  ]
}
```

**Update order status example:**
```json
PUT /api/orders/1/status
Authorization: Bearer {token}
{
  "status": "Shipped"
}
```

**Order statuses:**
```
Pending → Processing → Shipped → Delivered
```
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
