import type React from "node_modules/@types/react/index";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "@/features/authentication/useAuth";
import Spinner from "@/components/Spinner";
export default function ProtectedRoute() {
  const { isAuthenticated, user, loading } = useAuth();
  console.log(isAuthenticated);
  if (loading) {
    return <Spinner></Spinner>;
  }

  if (!isAuthenticated) {
    console.log("redirect");
    return <Navigate to="/signin" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
