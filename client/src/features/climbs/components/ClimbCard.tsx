import ContentSpinner from "@/components/spinner/ContentSpinner";
import type { ClimbResponse } from "@shared/types";
import type React from "node_modules/@types/react/index";
import ClimbPic from "./ClimbPic";
import ErrorMessage from "@/components/error/ErrorMessage";

function ClimbGrade({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className="w-full text-center text-white rounded-sm"
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}
interface ClimbCardProps {
  pending: boolean;
  error: Error | null;
  data?: ClimbResponse;
}

function ClimbCardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full py-2 px-5 flex justify-center items-center flex-col items-center gap-10">
      {children}
    </div>
  );
}

export default function ClimbCard({ pending, error, data }: ClimbCardProps) {
  if (pending) {
    return (
      <ClimbCardLayout>
        <ContentSpinner></ContentSpinner>
      </ClimbCardLayout>
    );
  }

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }

  if (!data) {
    throw new Error("climb not found!");
  }
  console.log(data);
  return (
    <ClimbCardLayout>
      {/* {data.picture && (
        <img
          className="w-full h-50 box-border rounded-md border-6 border-black object-cover"
          style={{ borderColor: data.color }}
          src={data.picture || undefined}
        ></img>
      )} */}

      <ClimbPic
        picture={data.picture || undefined}
        color={data.color}
      ></ClimbPic>
      {data.grade && <ClimbGrade color={data.color}>{data.grade}</ClimbGrade>}
    </ClimbCardLayout>
  );
}
