// useAdminAuth.js
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../config/axios";

const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = useCallback(async () => {
    try {
      await axiosInstance.get("/api/auth/admin/me");
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated, recheckAuth: checkAuth };
};

export default useAdminAuth;
