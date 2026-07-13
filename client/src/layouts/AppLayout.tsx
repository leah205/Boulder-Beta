import type React from "node_modules/@types/react/index";
import useAuth from "../features/authentication/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function NavLink({ children }: { children: React.ReactNode }) {
  return (
    <li className=" gap-10 text-mist-500 hover:text-mist-700 px-5 hover:bg-mist-100 rounded-sm py-5">
      {children}
    </li>
  );
}

function TopNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className=" z-10 bg-white  w-full top-0 fixed  border-b-1 border-b-mist-300">
      <ul className="flex-1 flex ">{children}</ul>
    </nav>
  );
}

function BottomNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className=" z-10 bg-white w-full bottom-0 fixed border-t-1 border-t-mist-300">
      <ul className="flex-1 flex ">{children}</ul>
    </nav>
  );
}

export default function AppLayout() {
  const { signout } = useAuth();
  return (
    <>
      <main className="flex  box-border">
        <TopNav>
          <NavLink>
            <Link onClick={signout} to="/">
              Signout
            </Link>
          </NavLink>
        </TopNav>
        <div className="w-full pt-16 pb-16">
          <Outlet />
        </div>
        <BottomNav>
          <NavLink>
            <Link to="log-climb">+</Link>
          </NavLink>
          <NavLink>
            <Link to="my-climbs">My Climbs</Link>
          </NavLink>
          <NavLink>
            <Link to="feed">Feed</Link>
          </NavLink>
          <NavLink>
            <Link to="my-posts">My Posts</Link>
          </NavLink>
        </BottomNav>
      </main>
    </>
  );
}
