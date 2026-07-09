import type React from "react";

interface FormProps {
  children: React.ReactNode;
  enctype?: string;
  className?: string;
}

export default function Form({ children, className, enctype = "" }: FormProps) {
  return (
    <form
      method="post"
      className={`border-mist-300 max-[600px]:w-5/6 max-[800px]:pr-1 my-5 border-1 rounded-md p-6 w-1/2 mx-auto shadow-md absolute left-1/2 -translate-x-1/2  ${className}`}
      encType={enctype}
    >
      {children}
    </form>
  );
}
