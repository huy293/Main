// components/AdminProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAdminAuth from "../hooks/useAuth";
import spinner_Default from "./Spin/Default";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) return <spinner_Default />; // Hoặc spinner

  if (isAuthenticated === false) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
