import type React from "node_modules/@types/react/index";

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
        backgroundImage: `url("/src/assets/mountain.svg")`,
        backgroundColor: "rgb(235, 235, 235)",
      };

  return (
    <div
      className={`text-center hover:bg-mist-50 p-6 rounded-md border-1 border-mist-300 shadow-sm w-50 h-50 border-5 relative`}
      style={{ ...style, borderColor: color, backgroundSize: "cover" }}
    >
      {children}
    </div>
  );
}
