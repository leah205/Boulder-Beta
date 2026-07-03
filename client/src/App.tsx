import { Outlet } from "react-router-dom";
import router from "./routes.tsx";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
