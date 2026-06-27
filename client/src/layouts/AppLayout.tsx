import useAuth from "../features/authentication/useAuth";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function NavLink({ children }: { children: React.ReactNode }) {
  return (
    <li className=" gap-10 text-mist-500 hover:text-mist-700 px-5 hover:bg-mist-100 rounded-sm py-5">
      {children}
    </li>
  );
}

function NavList({ children }: { children: React.ReactNode }) {
  return <ul className="flex-1 flex-col flex ">{children}</ul>;
}

export default function AppLayout() {
  const { signout } = useAuth();

  return (
    <>
      <main className="flex h-screen box-border p-20">
        <nav className="w-1/5 flex flex-col justify-between b-3 rounded-sm h-full">
          <NavList>
            <NavLink>
              <Link to="about">Logo</Link>
            </NavLink>
            <NavLink>
              <Link to="log-climb">Log Climb</Link>
            </NavLink>
            <NavLink>
              <Link to="my-climbs"> My Climbs</Link>
            </NavLink>
            <NavLink>
              <Link onClick={signout} to="/">
                Signout
              </Link>
            </NavLink>
          </NavList>
        </nav>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
}
