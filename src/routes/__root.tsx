import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navigation } from "../components/Navigation";
const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-start">
        <Navigation />
      </div>
      <QueryClientProvider client={queryClient}>
        
          <Outlet />
          <TanStackRouterDevtools />
          <ReactQueryDevtools initialIsOpen={false} />
       
      </QueryClientProvider>
    </div>
  ),
});
