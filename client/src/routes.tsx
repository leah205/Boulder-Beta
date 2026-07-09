import App from "./App";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LogClimbPage from "./pages/LogClimbPage";
import MyClimbsPage from "./pages/MyClimbsPage";
import ClimbPage from "./pages/ClimbPage";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./layouts/ProtectedRoute";
import BoundaryWrapper from "./components/BoundaryWrapper";

export default function RouteElements() {
  return (
    <Routes>
      <Route element={<BoundaryWrapper />}>
        <Route path="/" element={<App />}>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route
                index
                element={<Navigate to="my-climbs" replace />}
              ></Route>
              <Route path="log-climb" element={<LogClimbPage />}></Route>
              <Route path="my-climbs" element={<MyClimbsPage />}></Route>
              <Route path="/climbs/:id" element={<ClimbPage />}></Route>
              {/* <Route path="/attempts/:id" element={<AttemptPage />}></Route> */}
            </Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="signin" element={<SigninPage />}></Route>
            <Route path="signup" element={<SignupPage />}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
