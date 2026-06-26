import useAuth from "../features/authentication/useAuth";

import { Link } from "react-router-dom";

function NavLink({ children }: { children: React.ReactNode }) {
  return (
    <li className=" text-mist-500 hover:text-mist-700 px-5  hover:bg-mist-100 rounded-sm py-5">
      {children}
    </li>
  );
}

function NavList({ children }: { children: React.ReactNode }) {
  return <ul className="flex-1 flex-row flex max-w-fit ">{children}</ul>;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, signout } = useAuth();

  return (
    <>
      <nav className="mb-10 flex justify-between">
        <NavList>
          <NavLink>
            <Link to="about">Logo</Link>
          </NavLink>
          <NavLink>
            <Link to="about">About</Link>
          </NavLink>
          <NavLink>
            <Link to="posts">Posts</Link>
          </NavLink>
        </NavList>

        <NavList>
          {!isAuthenticated && (
            <>
              <NavLink>
                <Link to="signup">Register</Link>
              </NavLink>
              <NavLink>
                <Link to="signin">Login</Link>
              </NavLink>
            </>
          )}
          {isAuthenticated && (
            <NavLink>
              <Link onClick={signout} to="/">
                Signout
              </Link>
            </NavLink>
          )}
        </NavList>
      </nav>

      <div>{children}</div>
    </>
  );
}
