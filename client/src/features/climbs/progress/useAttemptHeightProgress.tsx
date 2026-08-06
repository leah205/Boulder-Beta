import type { AttemptWithVideoResponse } from "@shared/types";
import Chart from "chart.js/auto";
import useClimb from "../hooks/useClimb";
import { useEffect } from "react";

type ParamTypes = {
  heightChartRef: React.RefObject<HTMLCanvasElement | null>;
  data: AttemptWithVideoResponse[] | undefined;
};
export default function useAttemptHeightProgress({
  heightChartRef,
  data,
}: ParamTypes) {
  const { topHeight } = useClimb();
  useEffect(() => {
    let chart: Chart | null;
    if (!heightChartRef.current) {
      return;
    }

    const attemptsWithHeight = data?.filter((attempt) => attempt.height);

    if (topHeight && attemptsWithHeight && attemptsWithHeight.length) {
      const attemptHeights = attemptsWithHeight.map((attempt) => {
        return (attempt!.height! / topHeight) * 100;
      });
      console.log(attemptHeights);

      chart = new Chart(heightChartRef.current, {
        type: "line",
        data: {
          labels: attemptsWithHeight.map((row, i) => i),
          datasets: [
            {
              label: "Attempt progress",
              data: attemptHeights,
            },
          ],
        },
        options: {
          scales: {
            y: {
              min: 0,
              max: 100,
            },
          },
        },
      });
    }
    return () => {
      if (chart) chart.destroy();
    };
  }, [data]);
}
