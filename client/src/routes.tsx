import App from "./App";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signin" element={<SigninPage />}></Route>
      <Route path="signup" element={<SignupPage />}></Route>
    </Route>,
  ),
);

export default router;
