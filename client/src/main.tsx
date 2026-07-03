import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouteElements from "./routes.tsx";
import AuthProvider from "./features/authentication/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";

// const router = createBrowserRouter(createRoutesFromElements(RouteElement()));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <RouteElements />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
