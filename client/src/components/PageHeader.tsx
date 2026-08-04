import type React from "react";

type PageHeaderProps = {
  children: React.ReactNode;
};
export default function PageHeader({ children }: PageHeaderProps) {
  return (
    <h1 className="text-center text-mist-600 text-3xl py-5 ">{children}</h1>
  );
}
