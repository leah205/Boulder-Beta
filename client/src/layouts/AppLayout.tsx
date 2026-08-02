import type React from "node_modules/@types/react/index";
import useAuth from "../features/authentication/useAuth";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";

function TopNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className=" z-100 bg-white  w-full top-0 fixed  border-b-1 border-b-mist-300">
      <ul className="flex-1 flex justify-between">{children}</ul>
    </nav>
  );
}

function BottomNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className=" z-100 bg-white w-full bottom-0 fixed border-t-1 border-t-mist-300">
      <ul className="flex-1 flex ">{children}</ul>
    </nav>
  );
}

export default function AppLayout() {
  const { signout } = useAuth();
  const location = useLocation();
  const url = location.pathname;

  return (
    <>
      <main className="flex  box-border">
        <TopNav>
          <NavLink>
            <Link onClick={signout} to="/">
              Signout
            </Link>
          </NavLink>
          <NavLink selected={url == "/my-profile-page"}>
            <Link to="my-profile-page">Profile Page</Link>
          </NavLink>
        </TopNav>
        <div className="w-full pt-16 pb-16">
          <Outlet />
        </div>
        <BottomNav>
          <NavLink selected={url == "/log-climb"}>
            <Link to="log-climb">+</Link>
          </NavLink>
          <NavLink selected={url == "/my-climbs"}>
            <Link to="my-climbs">My Climbs</Link>
          </NavLink>
          <NavLink selected={url == "/feed"}>
            <Link to="feed">Feed</Link>
          </NavLink>

          <NavLink selected={url == "/my-posts"}>
            <Link to="my-posts">My Posts</Link>
          </NavLink>
        </BottomNav>
      </main>
    </>
  );
}
