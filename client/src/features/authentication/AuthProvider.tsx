import React, { useState } from "react";
import { useEffect } from "react";
import authService from "./auth_service";
import AuthContext from "./AuthContext";
import type { LoginRequest, AuthResponse } from "@shared/types";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      let userData = null;
      try {
        userData = await authService.getUserFromToken();
        ("in hook");
        userData;
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

  const signin = async (loginInput: LoginRequest) => {
    try {
      const { token, ...userData } = await authService.login(loginInput);
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

  ("in auth provider");
  user;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
