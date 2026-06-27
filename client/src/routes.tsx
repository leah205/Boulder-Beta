import App from "./App";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import PrivateRoutes from "./layouts/PrivateRoutes";
import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<PrivateRoutes />}>
        <Route index element={<AppLayout />}></Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="signin" element={<SigninPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
      </Route>
    </Route>,
  ),
);

export default router;
