import type React from "node_modules/@types/react/index";
import mountainSvg from "@assets/mountain.svg";
type ClimbPicProps = {
  children?: React.ReactNode;
  picture: string | undefined;
  color: string;
  className?: string;
};

export default function ClimbPic({
  children,
  picture,
  color,
  className,
}: ClimbPicProps) {
  const style = {
    backgroundImage: `url(${picture}), url("${mountainSvg}")`,
    backgroundColor: "rgb(235, 235, 235)",
  };

  return (
    <div
      className={`text-center my-3 hover:bg-mist-50 rounded-md border-1 border-mist-300 shadow-sm w-70 h-70 md:w-50 md:h-50 border-5 relative ${className}`}
      style={{ ...style, borderColor: color, backgroundSize: "cover" }}
      data-testid="climb-pic"
    >
      {children}
    </div>
  );
}
