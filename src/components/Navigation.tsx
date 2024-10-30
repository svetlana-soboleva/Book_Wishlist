import { Link, useLocation } from "@tanstack/react-router";

export const Navigation = () => {
  return (
    <div className="bg-white flex flex-row justify-center gap-4 m-4 p-1 border border-gray-700 rounded-lg">
      <NavLink to="/" label="My Wish List" />
      <NavLink to="/search" label="Search" search={{ query: "" }} />
    </div>
  );
};

type NavLinkProps = {
  to: string;
  label: string;
  search?: { query: string } | null;
};

const NavLink = ({ to, label, search = null }: NavLinkProps) => {
  const location = useLocation();
  const isActive =
    location.pathname.endsWith(to) ||
    (to === "/" && location.pathname === "/Book_Wishlist/");

  return (
    <Link
      to={to}
      search={search || undefined}
      className={`p-2 rounded-lg text-gray-800 ${isActive ? "bg-purple-200" : "text-gray-600"}`}
    >
      {label}
    </Link>
  );
};
