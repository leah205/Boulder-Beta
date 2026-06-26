import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./features/authentication/AuthProvider";
const queryClient = new QueryClient();
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppLayout>
            <Outlet />
          </AppLayout>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
