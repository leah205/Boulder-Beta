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

function NavContents({ url, id}: { url: string, id: number }) {
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

      <NavLink selected={url == `/users/posts/${id}`}>
        <Link to={`/users/posts/${id}`}>My Posts</Link>
      </NavLink>
      <NavLink selected={url == `/users`}> 
        <Link to={`/users`}>Users</Link>
</NavLink>
    </>
  );
}

export default function AppLayout() {
  const { signout, user } = useAuth();
  const location = useLocation();
  const url = location.pathname;

  return (
    <>
      <main className="flex text-mist-700 box-border">
        <TopNav>
          <NavLink>
            <Link onClick={signout} to="/">
              Signout
            </Link>
          </NavLink>
          <NavLink selected={url == `/profile-page/${user!.id}`}>
            <Link to={`/profile-page/${user!.id}`}>
              <img className="h-10" src={ProfileSvg}></img>
            </Link>
          </NavLink>
        </TopNav>
        {/* for desktop */}
        <div className="flex w-full">
          <Sidebar>
            <NavContents id = {user!.id} url={url}></NavContents>
          </Sidebar>
          <div className="w-full pt-30 pb-16 lg:w-3/5 lg:ml-100 ">
            <Outlet />
          </div>
        </div>
        {/* for mobile/tablet */}
        <BottomNav>
          <NavContents id = {user!.id} url={url}></NavContents>
        </BottomNav>
      </main>
    </>
  );
}
