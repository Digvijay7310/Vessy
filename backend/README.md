# Ecommerce Backend API

This is a mern based backend for an e-commerce applicaion. It supposts **products CRUD**, **category-based fetching**, ** user authentication**, **Cloudinary image uploads**, and search functionality.

---
## **Technologies User**
- Node.js
- Express.js
- MongoDB (mongoose)
- Cloudinary (Image Upload)
- Muleter (file upload)
- dotenv (Environment Variables)
- Joi (validation)
- bcrypt (Password Hashing, if implementing auth)
- Async Handler for error handling

---


## **Setup**
1. Clone the repository:
``` bash
git clone github.com/Digvijay7310/Vessy
cd backend

2. install dependencies
npm install

3. Create a .env files
PORT=8000
DB_HOST=mongodb://127.0.0.1:27017/ecommerce
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret


4. Start the server
npm run dev