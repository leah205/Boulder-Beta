import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { useLocation } from "react-router-dom";
type ClimbPageNavProps = {};
export default function ClimbPageNav({}: ClimbPageNavProps) {
  const location = useLocation();
  const urlArr = location.pathname.split("/");
  const path = urlArr[urlArr.length - 1];
  console.log(path);

  return (
    <nav>
      <ul className="flex justify-center gap-3">
        <NavLink selected={path == "attempts"}>
          <Link to="attempts">Attempts </Link>
        </NavLink>
        <NavLink selected={path == "progress"}>
          <Link to="progress">Progress </Link>
        </NavLink>
      </ul>
    </nav>
  );
}
