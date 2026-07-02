import { Outlet } from "react-router-dom";
import router from "./routes.tsx";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Outlet />
    </>
  );
}

export default App;
