import type React from "react";
import { id } from "zod/v4/locales";

export default function ErrorWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-red-50 border-red-200 text-xs text-center p-3 m-auto border-1 text-red-400 w-4/5 my-3">
      {children}
    </div>
  );
}
