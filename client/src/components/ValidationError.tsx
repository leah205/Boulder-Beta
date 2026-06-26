import type React from "react";

interface ValidationErrorProps {
  children: React.ReactNode;
}

export default function ValidationError({ children }: ValidationErrorProps) {
  return (
    <div className="bg-red-50 border-red-200 text-center p-3 m-3 border-1 text-red-400">
      {children}
    </div>
  );
}
