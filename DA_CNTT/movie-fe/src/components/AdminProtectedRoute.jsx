// components/AdminProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdminAuth from "../hooks/useAuth";
import spinner_Default from "./Spin/Default";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <spinner_Default />
      </div>
    );
  }

  // If not authenticated, redirect to login page with return path
  if (isAuthenticated === false) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the protected content
  return children;
};

export default AdminProtectedRoute;
