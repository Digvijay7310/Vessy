import axios from './axios';

// Get my cart
export const getCart = () => axios.get("/carts");

// Add item to cart
export const addToCart = (data) => axios.post("/carts/add", data);

// Remove item from cart
export const removeFromCart = (productId) => axios.delete(`/carts/remove/${productId}`);

// Increase item quantity
export const increaseQuantity = (productId) => axios.put(`/carts/increase/${productId}`);

// Decrease item quantity
export const decreaseQuantity = (productId) => axios.put(`/carts/decrease/${productId}`);

// Clear cart
export const clearCart = () => axios.delete("/carts/clear");
