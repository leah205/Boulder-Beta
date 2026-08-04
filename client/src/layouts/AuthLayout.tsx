import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <h1 className="text-center text-5xl text-blue-400 py-10">
        Welcome to Boulder Beta
      </h1>
      <p className="text-center text-3xl text-blue-300 pb-6">
        A personal project to enable easy climbing tracking and sharing.
      </p>
      <Outlet />
    </>
  );
}
