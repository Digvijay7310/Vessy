import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";

function ProtectedAdmin({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!admin && window.location.pathname !== "/admins/login") {
    return <Navigate to="/admins/login" replace />;
  }
  return children;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      <Route path="/" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>

      {/* Redirect unknown admin routes */}
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
}
