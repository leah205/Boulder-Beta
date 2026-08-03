import { useOutletContext } from "react-router-dom";
import { useEffect, useRef } from "react";
import type { AttemptWithVideoResponse } from "@shared/types";
import ContentSpinner from "@/components/spinner/ContentSpinner";
import ErrorMessage from "@/components/error/ErrorMessage";
import useAttemptHeightProgress from "../hooks/useAttemptHeightProgress";
import useAttemptDayCount from "../hooks/useAttemptDayCount";

type AttemptContext = {
  pending: boolean;
  error: Error | null;
  data: AttemptWithVideoResponse[] | undefined;
};

type ProgressTrackerProps = {};
export default function ProgressTracker({}: ProgressTrackerProps) {
  const heightChartRef = useRef<HTMLCanvasElement | null>(null);
  const countChartRef = useRef<HTMLCanvasElement | null>(null);
  const { pending, error, data } = useOutletContext<AttemptContext>();

  useAttemptHeightProgress({ heightChartRef, data });
  useAttemptDayCount({ countChartRef, data });

  if (pending) {
    return <ContentSpinner></ContentSpinner>;
  }

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }

  if (!data) {
    return <p>No analytics available for this climb.</p>;
  }

  return (
    <>
      <div className=" w-full flex items-center flex-col">
        <div className="h-50 w-full">
          <canvas ref={heightChartRef}></canvas>
        </div>
        <div className="h-50 w-full">
          <canvas ref={countChartRef}></canvas>
        </div>
      </div>
    </>
  );
}
