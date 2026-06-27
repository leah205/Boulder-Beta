import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../features/authentication/useAuth";
export default function PrivateRoutes() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  console.log("yooohooo");
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}
