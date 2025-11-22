import axios from './axios';

// Get all products
export const getAllProducts = () => axios.get("/products");

// Get product by ID
export const getProductById = (productId) => axios.get(`/products/${productId}`);

// Get products by category
export const getProductsByCategory = (category) => axios.get(`/products/category/${category}`);

// Search products
export const searchProducts = (query) => axios.get(`/products/search?q=${query}`);
