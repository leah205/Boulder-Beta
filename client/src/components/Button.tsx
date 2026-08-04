import type React from "react";

interface Props {
  children: React.ReactNode;
  type?: "submit" | "button" | undefined;
  className?: string;
  onClick: () => void;
}

export default function Button({ children, type, className, onClick }: Props) {
  return (
    <button
      className={`bg-blue-300 text-white p-3 rounded-sm ${className}`}
      type={type || "button"}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
