import { Outlet, Navigate, Routes, Route } from 'react-router-dom';
import { useUserAuth } from "../hooks/userUserAuth";
import { useAuth } from "../hooks/useAuth";

// Layouts & Pages
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import UserProducts from "../pages/UserProducts";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";

export function ProtectedRoute({ children }) {
  const { admin, loading: adminLoading } = useAuth();
  const { user, loading: userLoading } = useUserAuth();

  if (adminLoading || userLoading) return <p>Loading...</p>;
  if (admin || user) return children;

  return <Navigate to="/users/login" replace />;
}

export default function UserRouter() {
  return (
    <>
      {/* Public routes */}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* User layout wrapper */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<UserProducts />} />
          <Route path="products/:id" element={<ProductDetails />} />

          {/* Protected routes */}
          <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </>
  );
}
