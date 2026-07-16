import type React from "react";
import { twMerge } from "tailwind-merge";

interface FormProps {
  children: React.ReactNode;
  enctype?: string;
  className?: string;
}
//border-mist-300  max-[600px]:w-5/6 max-[800px]:pr-1 my-5 border-1 rounded-md p-6 mx-auto shadow-md  //
export default function Form({ children, className, enctype = "" }: FormProps) {
  return (
    <form
      method="post"
      className={` my-5 w-5/6 overflow-hidden border-1 rounded-md p-6 mx-auto shadow-md border-mist-300 ${className}`}
      encType={enctype}
    >
      {children}
    </form>
  );
}
