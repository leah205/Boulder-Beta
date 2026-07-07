import ContentSpinner from "@/components/ContentSpinner";
import type { Climb } from "@shared/types";
import type React from "node_modules/@types/react/index";
import ClimbPic from "./ClimbPic";
interface ClimbCardProps {
  pending: boolean;
  error: Error | null;
  data?: Climb;
}

function ClimbCardLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full p-3 h-60 flex justify-center">{children}</div>;
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
    return <p>{error.message}</p>;
  }

  if (!data) {
    throw new Error("climb not found!");
  }

  return (
    <ClimbCardLayout>
      {/* {data.picture && (
        <img
          className="w-full h-50 box-border rounded-md border-6 border-black object-cover"
          style={{ borderColor: data.color }}
          src={data.picture || undefined}
        ></img>
      )} */}

      <ClimbPic picture={data.picture} color={data.color}></ClimbPic>

      {data.grade && <p>{data.grade}</p>}
    </ClimbCardLayout>
  );
}
