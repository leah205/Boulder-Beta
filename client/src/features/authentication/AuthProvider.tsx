import React, { useState } from "react";
import type { User } from "../../types/auth_types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authService from "./auth_service";
import AuthContext from "./AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  console.log("auth provider render");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("authprovider mounted");
    const initializeAuth = async () => {
      let userData = null;
      try {
        userData = await authService.getUserFromToken();
        console.log(userData);
      } catch (err) {
        console.log(err);
        console.log("no valid token set");
        //navigate("/signin");
      } finally {
        setLoading(false);
      }
      if (userData) {
        console.log("dataaaa");
        setUser(userData);
      } else {
        setUser(null);
        //navigate("/signin");
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
    console.log("signout?");
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
