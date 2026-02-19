                                               Login/Register
<img width="899" height="865" alt="image" src="https://github.com/user-attachments/assets/8522df1d-5ec4-46ae-9e21-52410b262a78" />
                                                     Home page
<img width="1315" height="897" alt="image" src="https://github.com/user-attachments/assets/8804f11c-ec6b-48d0-bdf2-b50dacbb29b3" />
                                                 Restaurent site
<img width="1354" height="905" alt="image" src="https://github.com/user-attachments/assets/16e4c46e-4f2f-4ac1-9085-bc49a5bf9a0e" />
                                                     Cart image
<img width="1359" height="579" alt="image" src="https://github.com/user-attachments/assets/3e34ecdc-07b7-4872-8af8-2e4f4769c4d8" />
A modern, full-stack food delivery platform built with industry-standard practices, featuring real-time order tracking, secure authentication, and comprehensive restaurant management.


📋 Table of Contents

Introduction
Features
System Architecture
Technology Stack
Project Scope
Security & Authentication
User Flow
Installation
API Documentation
Database Schema
Contributing
License


🎯 Introduction
Ziggy is an enterprise-grade food delivery application that connects customers, restaurants, and delivery partners through a seamless digital experience. Built with modern technologies and best practices, Ziggy provides a robust platform for ordering food, managing restaurants, and tracking deliveries in real-time.
Main Goals

Customer Experience: Provide a fast, intuitive interface for browsing restaurants and ordering food
Restaurant Management: Enable restaurant owners to manage menus, orders, and analytics
Delivery Efficiency: Optimize delivery routes and provide real-time tracking
Scalability: Built to handle thousands of concurrent users and orders
Security: Enterprise-level security with JWT authentication and role-based access control


✨ Features
For Customers 🛒

✅ Browse restaurants by cuisine, rating, and location
✅ Advanced search functionality (restaurants & menu items)
✅ Add items to cart with quantity management
✅ Secure checkout with multiple payment options
✅ Real-time order tracking with live map
✅ Order history and reordering
✅ Rating and review system
✅ Multiple delivery addresses

For Restaurants 🍽️

✅ Restaurant profile management
✅ Menu item management (add, edit, delete)
✅ Real-time order notifications
✅ Order acceptance and preparation tracking
✅ Sales analytics and reporting
✅ Customer feedback management

For Delivery Partners 🚗

✅ Available orders list
✅ Route optimization
✅ Real-time location tracking
✅ Earnings dashboard
✅ Delivery history

For Admins 👨‍💼

✅ Complete system monitoring
✅ User management (customers, restaurants, drivers)
✅ Order oversight and intervention
✅ Analytics and reporting
✅ Platform configuration


🏗️ System Architecture
High-Level Architecture
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Web App    │  │  Mobile App  │  │ Admin Panel  │ │
│  │   (React)    │  │ (React Native)│  │   (React)    │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                   ┌─────────▼──────────┐
                   │   API Gateway      │
                   │   Load Balancer    │
                   └─────────┬──────────┘
                             │
          ┌──────────────────┴──────────────────┐
          │                                     │
    ┌─────▼──────┐                      ┌──────▼─────┐
    │  FastAPI   │                      │  FastAPI   │
    │ Instance 1 │                      │ Instance 2 │
    └─────┬──────┘                      └──────┬─────┘
          │                                    │
          └────────────┬───────────────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
    ┌─────▼──────┐          ┌───────▼────┐
    │ PostgreSQL │          │   Redis    │
    │  Primary   │          │   Cache    │
    └────────────┘          └────────────┘
Component Architecture
┌────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                   │
│  • React Components                                    │
│  • State Management (Zustand)                          │
│  • Routing (React Router)                              │
└────────────────────┬───────────────────────────────────┘
                     │
┌────────────────────▼───────────────────────────────────┐
│                   APPLICATION LAYER                    │
│  • API Routes (FastAPI)                                │
│  • Business Logic                                      │
│  • Authentication & Authorization                       │
│  • Input Validation (Pydantic)                         │
└────────────────────┬───────────────────────────────────┘
                     │
┌────────────────────▼───────────────────────────────────┐
│                    DATA LAYER                          │
│  • Database Models (SQLAlchemy ORM)                    │
│  • Database Migrations (Alembic)                       │
│  • Query Optimization                                  │
└────────────────────┬───────────────────────────────────┘
                     │
┌────────────────────▼───────────────────────────────────┐
│                   PERSISTENCE LAYER                    │
│  • PostgreSQL Database                                 │
│  • Redis Cache                                         │
│  • File Storage (AWS S3)                              │
└────────────────────────────────────────────────────────┘

🛠️ Technology Stack
Frontend
- React 19.2.4          - UI Framework
- TypeScript 4.9.5      - Type Safety
- React Router 7.1.3    - Client-side Routing
- Zustand 4.x           - State Management
- Axios 1.7.9           - HTTP Client
- CSS3                  - Styling
Backend
- FastAPI 0.109.0       - Web Framework
- Python 3.14           - Programming Language
- Uvicorn 0.27.0        - ASGI Server
- SQLAlchemy 2.0.25     - ORM
- Alembic 1.13.1        - Database Migrations
- Pydantic 2.5.3        - Data Validation
- python-jose 3.3.0     - JWT Authentication
- passlib 1.7.4         - Password Hashing
- bcrypt 4.0.1          - Encryption
Database
- PostgreSQL 16         - Primary Database
- Redis 7.x             - Caching & Sessions
- pgAdmin 4             - Database Management
DevOps & Deployment
- Docker                - Containerization
- Docker Compose        - Multi-container Apps
- GitHub Actions        - CI/CD Pipeline
- AWS / Azure           - Cloud Hosting
- NGINX                 - Reverse Proxy

📊 Project Scope
Current Implementation (MVP) ✅
Phase 1: Core Authentication

 User registration with email verification
 Secure login with JWT tokens
 Role-based access control (Customer, Restaurant Owner, Delivery Partner, Admin)
 Password hashing with bcrypt
 Protected routes and API endpoints

Phase 2: Restaurant Management

 Restaurant listing with search and filters
 Restaurant detail pages
 Menu management (CRUD operations)
 Category filtering (Veg, Non-Veg, Cuisines)
 Restaurant ratings and reviews

Phase 3: Order Management

 Shopping cart functionality
 Add/remove items with quantity control
 Order summary with pricing breakdown
 Checkout process

In Progress 🚧
Phase 4: Payment Integration

 Stripe/Razorpay integration
 Multiple payment methods
 Payment history
 Refund management

Phase 5: Delivery System

 Real-time order tracking
 Delivery partner assignment
 Live location updates (WebSockets)
 Estimated delivery time

Planned Features 📅
Phase 6: Advanced Features

 Push notifications
 Email/SMS notifications
 Coupon and discount system
 Loyalty program
 Favorites and wishlists

Phase 7: Analytics & Reporting

 Admin dashboard
 Sales analytics
 User behavior analytics
 Revenue reports

Phase 8: Mobile & PWA

 React Native mobile app
 Progressive Web App (PWA)
 Offline support


🔐 Security & Authentication
Authentication Flow
┌─────────┐                                              ┌─────────┐
│  User   │                                              │ Server  │
└────┬────┘                                              └────┬────┘
     │                                                        │
     │  1. POST /auth/register                               │
     │  { email, password, name, phone, role }               │
     ├──────────────────────────────────────────────────────►│
     │                                                        │
     │                             2. Validate Input Data     │
     │                             3. Hash Password (bcrypt)  │
     │                             4. Store in Database       │
     │                             5. Generate JWT Token      │
     │                                                        │
     │  6. { access_token, token_type, user_info }           │
     │◄──────────────────────────────────────────────────────┤
     │                                                        │
     │  7. Store Token in localStorage                        │
     │                                                        │
     │  8. Subsequent Requests with Authorization Header      │
     │  Header: Authorization: Bearer <token>                 │
     ├──────────────────────────────────────────────────────►│
     │                                                        │
     │                             9. Verify JWT Token        │
     │                             10. Extract User Info      │
     │                             11. Check Permissions      │
     │                                                        │
     │  12. Protected Resource Data                           │
     │◄──────────────────────────────────────────────────────┤
Security Features
1. Password Security
python- Hashing Algorithm: bcrypt (cost factor: 12)
- Minimum Requirements:
  - 8+ characters
  - 1 uppercase letter
  - 1 lowercase letter
  - 1 number
  - 1 special character
- Password reset with email verification
2. JWT Token Security
python- Algorithm: HS256
- Token Expiry: 30 minutes (access token)
- Refresh Token: 7 days
- Secret Key: Environment variable (not hardcoded)
- Token Payload: { user_id, email, role, exp }
3. API Security
- HTTPS/TLS encryption (in transit)
- CORS configuration (allowed origins)
- Rate limiting (100 requests/min per user)
- SQL Injection prevention (parameterized queries)
- XSS protection (input sanitization)
- CSRF protection (token-based)
4. Role-Based Access Control (RBAC)
┌────────────────┬──────────┬───────────┬──────────┬───────┐
│   Permission   │ Customer │Restaurant │ Delivery │ Admin │
├────────────────┼──────────┼───────────┼──────────┼───────┤
│ Browse Menu    │    ✓     │     ✓     │    ✓     │   ✓   │
│ Place Order    │    ✓     │     ✗     │    ✗     │   ✓   │
│ Manage Menu    │    ✗     │     ✓     │    ✗     │   ✓   │
│ Accept Order   │    ✗     │     ✓     │    ✗     │   ✓   │
│ Deliver Order  │    ✗     │     ✗     │    ✓     │   ✓   │
│ View Analytics │    ✗     │    Own    │   Own    │  All  │
│ Manage Users   │    ✗     │     ✗     │    ✗     │   ✓   │
│ System Config  │    ✗     │     ✗     │    ✗     │   ✓   │
└────────────────┴──────────┴───────────┴──────────┴───────┘
5. Database Security
sql-- User credentials stored securely
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,  -- bcrypt hashed
    role VARCHAR NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for secure queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

🔄 User Flow
1. Customer Journey
┌──────────────┐
│   Landing    │
│     Page     │
└──────┬───────┘
       │
       ↓
┌──────────────┐     ┌──────────────┐
│   Register   │────►│    Login     │
└──────┬───────┘     └──────┬───────┘
       │                    │
       └────────┬───────────┘
                │
                ↓
        ┌──────────────┐
        │  Home Page   │
        │ (Restaurants)│
        └──────┬───────┘
               │
               ↓
        ┌──────────────┐
        │    Search    │────────┐
        │  Restaurants │        │
        └──────┬───────┘        │
               │                │
               ↓                ↓
        ┌──────────────┐  ┌──────────────┐
        │  Restaurant  │  │    Filter    │
        │    Detail    │  │  (Cuisine,   │
        └──────┬───────┘  │   Rating)    │
               │          └──────────────┘
               ↓
        ┌──────────────┐
        │  View Menu   │
        │  (Veg/Non-Veg│
        │   Categories)│
        └──────┬───────┘
               │
               ↓
        ┌──────────────┐
        │  Add to Cart │◄──────┐
        └──────┬───────┘        │
               │                │
               ↓                │
        ┌──────────────┐        │
        │  View Cart   │        │
        └──────┬───────┘        │
               │                │
          Modify Items?─────────┘
               │ No
               ↓
        ┌──────────────┐
        │   Checkout   │
        │  (Address,   │
        │   Payment)   │
        └──────┬───────┘
               │
               ↓
        ┌──────────────┐
        │ Place Order  │
        └──────┬───────┘
               │
               ↓
        ┌──────────────┐
        │ Order Track  │
        │  (Real-time) │
        └──────┬───────┘
               │
               ↓
        ┌──────────────┐
        │   Delivered  │
        │    Rating    │
        └──────────────┘
2. Restaurant Owner Journey
┌──────────────┐
│   Register   │
│  (Owner Role)│
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Approval   │
│  by Admin    │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Dashboard  │
└──────┬───────┘
       │
       ├──────►┌──────────────┐
       │       │   Manage     │
       │       │ Restaurant   │
       │       │   Profile    │
       │       └──────────────┘
       │
       ├──────►┌──────────────┐
       │       │   Manage     │
       │       │     Menu     │
       │       │ (Add/Edit/   │
       │       │   Delete)    │
       │       └──────────────┘
       │
       ├──────►┌──────────────┐
       │       │   Incoming   │
       │       │    Orders    │
       │       │  (Accept/    │
       │       │   Reject)    │
       │       └──────────────┘
       │
       └──────►┌──────────────┐
               │  Analytics   │
               │   & Sales    │
               │   Reports    │
               └──────────────┘
3. Delivery Partner Journey
┌──────────────┐
│   Register   │
│ (Driver Role)│
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Verification │
│  & Training  │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Go Online  │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│  Available   │
│   Orders     │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Accept Order │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Navigate   │
│  to Pickup   │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Pickup Food  │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Navigate   │
│ to Customer  │
│ (Live Track) │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Deliver    │
│   & Confirm  │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Earnings   │
│   Updated    │
└──────────────┘
4. Admin Journey
┌──────────────┐
│ Admin Login  │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Dashboard  │
│  (Overview)  │
└──────┬───────┘
       │
       ├──────►┌──────────────┐
       │       │    Manage    │
       │       │    Users     │
       │       │ (CRUD Ops)   │
       │       └──────────────┘
       │
       ├──────►┌──────────────┐
       │       │   Approve    │
       │       │ Restaurants  │
       │       └──────────────┘
       │
       ├──────►┌──────────────┐
       │       │   Monitor    │
       │       │    Orders    │
       │       │  (All Live)  │
       │       └──────────────┘
       │
       ├──────►┌──────────────┐
       │       │  Analytics   │
       │       │  & Reports   │
       │       │ (System-wide)│
       │       └──────────────┘
       │
       └──────►┌──────────────┐
               │   System     │
               │    Config    │
               └──────────────┘

🚀 Installation
Prerequisites
bash- Node.js 18+ and npm
- Python 3.14+
- PostgreSQL 16+
- Redis 7+ (optional, for caching)
- Git
Backend Setup
bash# 1. Clone the repository
git clone https://github.com/yourusername/ziggy-food-delivery.git
cd ziggy-food-delivery

# 2. Navigate to backend
cd backend

# 3. Create virtual environment
python -m venv venv

# 4. Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 5. Install dependencies
pip install -r requirements.txt

# 6. Create .env file
cp .env.example .env

# 7. Update .env with your credentials
# DATABASE_URL=postgresql://postgres:your_password@localhost:5432/ziggy
# SECRET_KEY=your-secret-key-here
# JWT_ALGORITHM=HS256
# ACCESS_TOKEN_EXPIRE_MINUTES=30

# 8. Create database
psql -U postgres
CREATE DATABASE ziggy;
\q

# 9. Run migrations
alembic upgrade head

# 10. Seed database with sample data (optional)
python -m app.seed_data

# 11. Start the server
uvicorn app.main:app --reload

# Server will start at http://localhost:8000
# API docs available at http://localhost:8000/docs
Frontend Setup
bash# 1. Navigate to frontend (in a new terminal)
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env file (optional)
cp .env.example .env

# 4. Update .env if needed
# REACT_APP_API_URL=http://localhost:8000

# 5. Start development server
npm start

# App will open at http://localhost:3000
Docker Setup (Alternative)
bash# 1. Make sure Docker and Docker Compose are installed

# 2. Build and run containers
docker-compose up --build

# Backend: http://localhost:8000
# Frontend: http://localhost:3000
# Database: localhost:5432

📚 API Documentation
Base URL
Development: http://localhost:8000/api/v1
Production: https://api.ziggy.com/v1
Authentication Endpoints
httpPOST /auth/register
POST /auth/login
POST /auth/refresh
GET  /auth/me
POST /auth/logout
Example: User Registration
Request:
httpPOST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "full_name": "John Doe",
  "phone": "1234567890",
  "password": "SecurePass@123",
  "role": "customer"
}
Response:
json{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "customer",
    "is_active": true,
    "created_at": "2026-02-19T10:30:00Z"
  }
}
Restaurant Endpoints
httpGET    /restaurants              # List all restaurants
GET    /restaurants/{id}         # Get restaurant details
POST   /restaurants              # Create restaurant (owner only)
PUT    /restaurants/{id}         # Update restaurant (owner only)
DELETE /restaurants/{id}         # Delete restaurant (owner/admin)
GET    /restaurants/{id}/menu    # Get restaurant menu
POST   /restaurants/{id}/menu    # Add menu item (owner only)
Order Endpoints
httpGET    /orders                   # List user orders
GET    /orders/{id}              # Get order details
POST   /orders                   # Create new order
PUT    /orders/{id}/status       # Update order status
DELETE /orders/{id}              # Cancel order
Full API Documentation
Interactive API documentation available at:
http://localhost:8000/docs         # Swagger UI
http://localhost:8000/redoc        # ReDoc

🗄️ Database Schema
Entity Relationship Diagram
┌─────────────────┐         ┌─────────────────┐
│     users       │         │  restaurants    │
├─────────────────┤         ├─────────────────┤
│ PK id           │         │ PK id           │
│    email        │◄───────┤│ FK owner_id     │
│    password_hash│    1:N ││    name         │
│    full_name    │         ││    description  │
│    phone        │         ││    cuisine_type │
│    role         │         ││    rating       │
│    is_active    │         │└─────────┬───────┘
│    created_at   │         │          │
└─────────────────┘         │          │ 1:N
                            │          │
                            │          ↓
                            │  ┌─────────────────┐
                            │  │   menu_items    │
                            │  ├─────────────────┤
                            │  │ PK id           │
                            │  │ FK restaurant_id│
                            │  │    name         │
                            │  │    price        │
                            │  │    category     │
                            │  │    is_vegetarian│
                            │  │    image_url    │
                            │  └─────────────────┘
                            │
                            ↓
              ┌─────────────────┐
              │     orders      │
              ├─────────────────┤
              │ PK id           │
              │ FK user_id      │
              │ FK restaurant_id│
              │    status       │
              │    total_amount │
              │    created_at   │
              └────────┬────────┘
                       │
                       │ 1:N
                       ↓
              ┌─────────────────┐
              │  order_items    │
              ├─────────────────┤
              │ PK id           │
              │ FK order_id     │
              │ FK menu_item_id │
              │    quantity     │
              │    price        │
              └─────────────────┘
Key Tables
Users Table
sqlCREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);
Restaurants Table
sqlCREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cuisine_type VARCHAR(100)[],
    address TEXT NOT NULL,
    phone VARCHAR(20),
    rating DECIMAL(3,2) DEFAULT 0.00,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);

📁 Project Structure
ziggy-food-delivery/
├── backend/
│   ├── alembic/                    # Database migrations
│   │   ├── versions/
│   │   └── env.py
│   ├── app/
│   │   ├── api/
│   │   │   ├── deps.py             # Dependencies
│   │   │   └── v1/
│   │   │       ├── auth.py         # Auth routes
│   │   │       └── restaurants.py  # Restaurant routes
│   │   ├── core/
│   │   │   └── security.py         # Security utilities
│   │   ├── models/
│   │   │   ├── user.py             # User model
│   │   │   ├── restaurant.py       # Restaurant model
│   │   │   └── menu_item.py        # Menu item model
│   │   ├── schemas/
│   │   │   ├── user.py             # User schemas
│   │   │   └── restaurant.py       # Restaurant schemas
│   │   ├── config.py               # Configuration
│   │   ├── database.py             # Database connection
│   │   ├── main.py                 # FastAPI app
│   │   └── seed_data.py            # Database seeding
│   ├── .env                        # Environment variables
│   ├── requirements.txt            # Python dependencies
│   └── alembic.ini                 # Alembic config
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.tsx          # Footer component
│   │   │   └── ProtectedRoute.tsx  # Route protection
│   │   ├── pages/
│   │   │   ├── Login.tsx           # Login page
│   │   │   ├── Register.tsx        # Registration page
│   │   │   ├── Home.tsx            # Home page
│   │   │   ├── RestaurantDetail.tsx# Restaurant details
│   │   │   └── Cart.tsx            # Shopping cart
│   │   ├── services/
│   │   │   ├── api.ts              # Axios instance
│   │   │   ├── authService.ts      # Auth service
│   │   │   └── restaurantService.ts# Restaurant service
│   │   ├── store/
│   │   │   └── cartStore.ts        # Cart state (Zustand)
│   │   ├── App.tsx                 # Main app component
│   │   └── index.tsx               # Entry point
│   ├── package.json                # Node dependencies
│   └── tsconfig.json               # TypeScript config
│
├── docker-compose.yml              # Docker setup
├── .gitignore
├── LICENSE
└── README.md

🧪 Testing
Run Backend Tests
bashcd backend
pytest
Run Frontend Tests
bashcd frontend
npm test
Test Coverage
bash# Backend
pytest --cov=app tests/

# Frontend
npm run test:coverage

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

Code Style Guidelines

Python: Follow PEP 8
TypeScript: Use ESLint config
Commits: Use conventional commits format
Documentation: Update README for new features


📝 Environment Variables
Backend (.env)
bash# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/ziggy

# JWT
SECRET_KEY=your-super-secret-key-min-32-chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=ziggy-uploads

# Payment (Optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
Frontend (.env.local)
bashREACT_APP_API_URL=http://localhost:8000
REACT_APP_GOOGLE_MAPS_KEY=your-google-maps-key

📊 Performance Metrics
Target Metrics

✅ API Response Time: < 200ms average
✅ Page Load Time: < 2 seconds
✅ Database Query Time: < 50ms average
✅ Uptime: 99.9%
✅ Concurrent Users: 10,000+


🐛 Known Issues

 Real-time notifications not yet implemented
 Payment gateway integration pending
 Mobile app in development

See Issues for a full list.

📅 Roadmap

 Phase 1: Authentication & User Management
 Phase 2: Restaurant & Menu Management
 Phase 3: Shopping Cart
 Phase 4: Payment Integration
 Phase 5: Real-time Order Tracking
 Phase 6: Mobile App (React Native)
 Phase 7: Admin Analytics Dashboard
 Phase 8: AI-powered Recommendations


📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors

Your Name - Initial work - YourGitHub


🙏 Acknowledgments

FastAPI documentation
React documentation
PostgreSQL community
All open-source contributors


📞 Support
For support, email support@ziggy.com or join our Slack channel.

⭐ Show your support
Give a ⭐️ if this project helped you!





