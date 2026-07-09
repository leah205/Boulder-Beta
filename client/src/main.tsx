import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouteElements from "@/app/routes.tsx";
import AuthProvider from "./features/authentication/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import BoundaryWrapper from "./components//error/BoundaryWrapper.tsx";
// const router = createBrowserRouter(createRoutesFromElements(RouteElement()));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BoundaryWrapper>
          <BrowserRouter>
            <RouteElements />
          </BrowserRouter>
        </BoundaryWrapper>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
