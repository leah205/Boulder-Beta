import type React from "react";

type PageHeaderProps = {
  children: React.ReactNode;
};
export default function PageHeader({ children }: PageHeaderProps) {
  return <h1 className="text-center font-6xl py-3 ">{children}</h1>;
}
