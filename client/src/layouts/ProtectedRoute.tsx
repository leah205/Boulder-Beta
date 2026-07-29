import { Outlet, Navigate } from "react-router-dom";
import useAuth from "@/features/authentication/useAuth";
import Spinner from "@/components/spinner/Spinner";
export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  isAuthenticated;
  if (loading) {
    return <Spinner></Spinner>;
  }

  if (!isAuthenticated) {
    ("redirect");
    return <Navigate to="/signin" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
