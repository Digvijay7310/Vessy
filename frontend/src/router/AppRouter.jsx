import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import AdminLayout from "../layouts/AdminLayout";

// Pages
import AdminLogin from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import Products from "../pages/Admin/Products";
import AddProduct from "../pages/Admin/AddProduct";
import EditProduct from "../pages/Admin/EditProduct";

function ProtectedAdmin({ children }) {
  const { admin, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!admin) return <Navigate to="/admin/login" />;

  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/admins/login" replace />} />
        
        {/* Admin Login */}
        <Route path="/admins/login" element={<AdminLogin />} />

        {/* Admin Panel */}
        <Route
          path="/admins"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
        
        {/* Producrs  */}
                  <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
