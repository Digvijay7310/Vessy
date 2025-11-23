import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import UserLayout from "../layouts/userLayout";

// Pages
import Home from "../pages/Home";
import Products from "../pages/Admin/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useUserAuth } from "../hooks/userUserAuth";

function ProtectedUser({ children }) {
  const { user, loading } = useUserAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />; // agar login nahi hai

  return children;
}

export default function UserRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />

        {/* All user routes wrapped in layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route
            path="carts"
            element={
              <ProtectedUser>
                <Cart />
              </ProtectedUser>
            }
          />
          <Route
            path="checkout"
            element={
              <ProtectedUser>
                <Checkout />
              </ProtectedUser>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedUser>
                <Orders />
              </ProtectedUser>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedUser>
                <Profile />
              </ProtectedUser>
            }
          />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
