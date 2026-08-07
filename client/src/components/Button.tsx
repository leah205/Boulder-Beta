import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const ButtonVariants = cva("text-white p-3 rounded-sm ", {
  variants: {
    variant: {
      red: "hover:bg-red-400 bg-red-300 active:bg-blue-400",
      blue: "bg-blue-300 hover:bg-blue-400 active:bg-red-400",
    },
  },
});

type Props = {
  children: React.ReactNode;
  type?: "submit" | "button" | undefined;
  className?: string;
  onClick: () => void;
} & VariantProps<typeof ButtonVariants>;

export default function Button({
  children,
  type,
  variant = "blue",
  className,
  onClick,
}: Props) {
  return (
    <button
      className={` ${ButtonVariants({ variant })} ${className}`}
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
