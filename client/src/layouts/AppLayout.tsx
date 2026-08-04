import type React from "node_modules/@types/react/index";
import useAuth from "../features/authentication/useAuth";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import ProfileSvg from "@assets/profile.svg";

function TopNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className=" z-101 bg-white  w-full top-0 fixed  border-b-1 border-b-mist-300">
      <ul className="flex-1 flex justify-between">{children}</ul>
    </nav>
  );
}

function BottomNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className=" lg:hidden z-100 bg-white w-full bottom-0 fixed border-t-1 border-t-mist-300">
      <ul className="flex-1 flex ">{children}</ul>
    </nav>
  );
}
function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <nav className=" hidden lg:block z-100 w-60 p-8 h-4/5 pt-30 my-30 border-mist-300 bg-mist-50 border-1 px-5 text-2xl fixed rounded-md">
      <ul className="flex-1 flex flex-col">{children}</ul>
    </nav>
  );
}

function NavContents({ url }: { url: string }) {
  return (
    <>
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
    </>
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
            <Link to="my-profile-page">
              <img className="h-10" src={ProfileSvg}></img>
            </Link>
          </NavLink>
        </TopNav>
        {/* for desktop */}
        <div className="flex w-full">
          <Sidebar>
            <NavContents url={url}></NavContents>
          </Sidebar>
          <div className="w-full pt-16 pb-16">
            <Outlet />
          </div>
        </div>
        {/* for mobile/tablet */}
        <BottomNav>
          <NavContents url={url}></NavContents>
        </BottomNav>
      </main>
    </>
  );
}
