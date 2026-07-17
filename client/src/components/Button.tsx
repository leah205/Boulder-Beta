import type React from "react";

interface Props {
  children: React.ReactNode;
  type: "submit" | "button";
  className?: string;
  onClick: () => void;
}

export default function Button({ children, type, className, onClick }: Props) {
  return (
    <button
      className={`bg-blue-500 text-white p-3 rounded-sm ${className}`}
      type={type}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
