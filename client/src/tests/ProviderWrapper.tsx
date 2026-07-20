import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/features/authentication/AuthProvider";

import { MemoryRouter } from "react-router-dom";
import RouteElements from "@/app/routes.tsx";
import CurrentUserContextProvider from "@/contexts/CurrentUserContext";

export default function ProviderWrapper({
  initRoute = "/",
}: {
  initRoute?: string;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CurrentUserContextProvider>
          <MemoryRouter initialEntries={[initRoute]}>
            <RouteElements></RouteElements>
          </MemoryRouter>
        </CurrentUserContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
