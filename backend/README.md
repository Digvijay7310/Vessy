# MERN E-commerce Backend

This is the backend for a MERN stack e-commerce we application with role-based authentication and product management. Admin can create, update and delete product with image upload support via Cloudinary.

---
## Features
 - User registration and login with **JWT authentication**
 - Role-based access control: `user' and `admin'
 - Password hashed using **bcrypt**
 - CRUD operation for products
 - Image upload via **Multer** and **Cloudinary**
 - Automatic deletion o flocal uploaded images after Cloudinary upload
 - Request validation using **express-validator**
 -Middleware for authentication, admin authorization, and error handling
 - Environment variables configuration with **dotenv**
 - CORS, cookie-parser, adn JSON parsing setup

 ---

 ## Tech Stack
 - Node.js & Express.js
 - MongoDB & Mongoose
 - Cloudinary for image uploads
 - Express Validator for request validation
 - JWT for authentication
 - Bcrypt for password hashing

 ---

 ### Installation
 1. Clone the repository: 

 ```bash
 git clone <https://github.com/Digvijay7310/Vessy/tree/main/backend>

2. Install Dependencies: 
 npm install

3. Create a .env file in the root

PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CORS_ORIGIN=<frontend-url>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

4. Start the development server
npm run dev


```
Auth
| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | /api/auth/register | Register a new user        |
| POST   | /api/auth/login    | Login user & get JWT token |

Product
| Method | Endpoint          | Description          | Access |
| ------ | ----------------- | -------------------- | ------ |
| GET    | /api/products     | Get all products     | Public |
| POST   | /api/products     | Create a new product | Admin  |
| PUT    | /api/products/:id | Update a product     | Admin  |
| DELETE | /api/products/:id | Delete a product     | Admin  |



backend/
├── config/           # DB & Cloudinary config
├── controllers/      # Route controllers
├── middlewares/      # Auth, error handling, validation
├── models/           # Mongoose models
├── routes/           # API routes
├── validators/       # Request validation
├── uploads/          # Temporary uploads (auto-deleted)
├── .env
├── server.js
└── package.json
