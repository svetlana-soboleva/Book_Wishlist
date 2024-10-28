import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const links = [
  { path: "/", label: "My Wish List" },
  { path: "/search", label: "Search", search: { query: "" } },
];

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-row justify-start gap-4 p-4 ">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="p-2 bg-green-100 rounded-md"
              {...(link.search ? { search: link.search } : {})}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  ),
});
