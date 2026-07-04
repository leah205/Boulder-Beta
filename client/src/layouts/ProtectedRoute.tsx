import { Outlet, Navigate } from "react-router-dom";
import useAuth from "@/features/authentication/useAuth";
import Spinner from "@/components/Spinner";
export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
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
