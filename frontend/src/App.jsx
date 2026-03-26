import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
    </AuthProvider>
  )
}


export default App;