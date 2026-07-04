import React, { useState } from "react";
import type { UserCredentials } from "@/types/auth_types";
import { useEffect } from "react";
import authService from "./auth_service";
import AuthContext from "./AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserCredentials | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      let userData = null;
      try {
        userData = await authService.getUserFromToken();
      } catch (err) {
      } finally {
        setLoading(false);
      }
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signin = async (username: string, password: string) => {
    try {
      const { token, ...userData } = await authService.login(
        username,
        password,
      );
      setUser(userData);
      localStorage.setItem("token", token);
      return userData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signout = async () => {
    setUser(null);
    try {
      await authService.logout();
    } catch (error) {
      console.error(error);
      throw error;
    }
    if (localStorage && localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  };

  const value = {
    user,
    signout,
    signin,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
