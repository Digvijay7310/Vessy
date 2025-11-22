import axios from './axios'

export const adminLogin = (data) => axios.post("/admins/login", data)
export const adminMe = () => axios.get("/admins/me")
export const adminLogout = () => axios.post("/admins/logout")
export const adminStats = () => axios.get("/admins/stats")

// Users
export const getUsers = () => axios.get("/admins/users")
export const blockUser = (id) => axios.put(`/admins/users/block/${id}`)
export const deleteUser = (id) => axios.delete(`/admins/users/${id}`)

// Products
export const getProducts = () => axios.get("/products")
export const addProduct = (data) => axios.post("/products/create", data)
export const getProductById = (id) => axios.get(`/products/${id}`)
export const updateProduct = (id, data) => axios.put(`/products/${id}`, data)
export const deleteProduct = (id) => axios.delete(`/products/${id}`)