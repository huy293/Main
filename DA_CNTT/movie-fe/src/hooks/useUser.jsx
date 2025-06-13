import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../config/axios";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Checking auth...');
      const response = await axiosInstance.get("/api/auth/me", {
        withCredentials: true
      });
      console.log('Auth response:', response.data);
      if (response.data.success) {
        setUser(response.data.user);
        setError(null);
      } else {
        setUser(null);
        setError(null);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setUser(null);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { user, loading, error, recheckAuth: checkAuth };
};

export default useUser; 