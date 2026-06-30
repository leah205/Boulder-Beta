import App from "./App";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LogClimbPage from "./pages/LogClimbPage";
import MyClimbsPage from "./pages/MyClimbsPage";
import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<AppLayout />}></Route>
      <Route path="log-climb" element={<LogClimbPage />}></Route>
      <Route path="my-climbs" element={<MyClimbsPage />}></Route>

      <Route element={<AuthLayout />}>
        <Route path="signin" element={<SigninPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
      </Route>
    </Route>,
  ),
);

export default router;
