import App from "@/app/App";
import SigninPage from "@/pages/SigninPage";
import SignupPage from "@/pages/SignupPage";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import LogClimbPage from "@/pages/LogClimbPage";
import MyClimbsPage from "@/pages/MyClimbsPage";
import ClimbPage from "@/pages/ClimbPage";
import Feed from "@/pages/Feed";
import MyPostsPage from "@/pages/MyPostsPage";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import PostPage from "@/pages/PostPage";
import ClimbAttemptsCard from "@/features/climbs/attempts/components/ClimbAttemptsCard";
import ProfilePage from "@/pages/ProfilePage";
import ProgressTracker from "@/features/climbs/progress/ProgressTracker";
export default function RouteElements() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="my-climbs" replace />}></Route>
            <Route path="log-climb" element={<LogClimbPage />}></Route>
            <Route path="my-climbs" element={<MyClimbsPage />}></Route>
            <Route path="climbs/:id" element={<ClimbPage />}>
              <Route
                index
                element={<Navigate to="attempts" replace></Navigate>}
                path=""
              ></Route>
              <Route element={<ClimbAttemptsCard />} path="attempts"></Route>
              <Route element={<ProgressTracker />} path="progress"></Route>
            </Route>
            <Route path="/feed" element={<Feed />}></Route>
            <Route path="/profile-page/:id" element={<ProfilePage />}></Route>
            
            <Route
              path="my-posts"
              element={<MyPostsPage></MyPostsPage>}
            ></Route>
            <Route path="posts/:id" element={<PostPage />}></Route>

            {/* <Route path="/attempts/:id" element={<AttemptPage />}></Route> */}
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<SigninPage />}></Route>
          <Route path="signup" element={<SignupPage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}
