import axios from './axios';

// Create a new order
export const createOrder = (data) => axios.post("/orders", data);

// Get all my orders
export const getMyOrders = () => axios.get("/orders");

// Get single order by ID
export const getSingleOrder = (orderId) => axios.get(`/orders/${orderId}`);

// Cancel an order
export const cancelOrder = (orderId) => axios.put(`/orders/cancel/${orderId}`);
