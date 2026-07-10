import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/features/authentication/AuthProvider";

import { MemoryRouter } from "react-router-dom";
import RouteElements from "@/app/routes.tsx";

export default function ProviderWrapper({
  initRoute = "/",
}: {
  initRoute?: string;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter initialEntries={[initRoute]}>
          <RouteElements></RouteElements>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
