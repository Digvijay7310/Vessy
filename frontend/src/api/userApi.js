import axios from './axios';

// Authentication
export const userRegister = (data) => axios.post("/users/register", data);
export const userLogin = (data) => axios.post("/users/login", data);
export const userLogout = () => axios.post("/users/logout");
export const refreshUserToken = () => axios.get("/users/refresh-token");

// Profile
export const getMyProfile = () => axios.get("/users/me");
export const updateUserProfile = (data) => axios.put("/users/me", data);
export const changeUserPassword = (data) => axios.put("/users/me/password", data);
export const deleteMyAccount = () => axios.delete("/users/me");

// Address
export const addAddress = (data) => axios.post("/users/me/address", data);
export const getAddresses = () => axios.get("/users/me/address");
export const deleteAddress = (index) => axios.delete(`/users/me/address/${index}`);
