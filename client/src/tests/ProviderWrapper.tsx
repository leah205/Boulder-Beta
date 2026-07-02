import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/features/authentication/AuthProvider";
import router from "@/routes.tsx";
import { RouterProvider } from "react-router-dom";
const queryClient = new QueryClient();

export default function ProviderWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
