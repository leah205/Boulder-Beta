import type React from "node_modules/@types/react/index";
import mountainSvg from "@assets/mountain.svg";
type ClimbPicProps = {
  children?: React.ReactNode;
  picture: string | undefined;
  color: string;
};

export default function ClimbPic({ children, picture, color }: ClimbPicProps) {
  const style = picture
    ? {
        backgroundImage: `url(${picture})`,
      }
    : {
        backgroundImage: `url("${mountainSvg}")`,
        backgroundColor: "rgb(235, 235, 235)",
      };

  return (
    <div
      className={`text-center my-3 hover:bg-mist-50 rounded-md border-1 border-mist-300 shadow-sm w-50 h-50 border-5 relative`}
      style={{ ...style, borderColor: color, backgroundSize: "cover" }}
      data-testid="climb-pic"
    >
      {children}
    </div>
  );
}
