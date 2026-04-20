# 🛒 Vessy - MERN Ecommerce Application

Vessy is a full-stack ecommerce web application built using the MERN stack (MongoDB, Express, React, Node.js).
It allows users to browse products, view details, and purchase items online.

---

## 🚀 Features

* 🔐 User Authentication (Login / Register)
* 🛍️ Browse Products
* 📄 Product Details Page
* 🛒 Add to Cart
* 💳 Checkout System (basic)
* 📦 Order Management (future scope)
* 📱 Fully Responsive Design (Mobile, Tablet, Desktop)

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 📂 Project Structure

```
Vessy/
│
├── frontend/        # React Frontend
│   ├── src/
│   └── ...
│
├── backend/        # Node + Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Digvijay7310/vessy.git
cd vessy
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🌐 API Endpoints (Basic)

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | /products             | Get all products   |
| GET    | /products/product/:id | Get single product |
| POST   | /custoemr/register        | Register user      |
| POST   | /customer/login           | Login user         |

---

## 📸 Screenshots

(Add screenshots here later)

---

## 🧠 Learning Goals

This project helped me learn:

* MERN stack integration
* REST API development
* State management in React
* Responsive UI design with Tailwind
* Authentication basics

---

## 🔮 Future Improvements

* ✅ Payment Gateway Integration (Stripe/Razorpay)
* ✅ Admin Dashboard
* ✅ Product Reviews & Ratings
* ✅ Wishlist Feature
* ✅ Order Tracking

---

## 🤝 Contributing

This is a beginner project, but suggestions and improvements are welcome!

---

## 📄 License

This project is open-source and free to use.

---

## 🙌 Acknowledgement

Built with ❤️ while learning MERN Stack.

---
