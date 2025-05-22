// useAdminAuth.js
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = useCallback(async () => {
    try {
      await axios.get("http://localhost:8888/api/auth/admin/me", {
        withCredentials: true,
      });
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
