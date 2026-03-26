import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  // While checking auth, show nothing or a loader
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If no admin, redirect to login
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  // If admin exists, render the child component
  return children;
};

export default ProtectedRoute;