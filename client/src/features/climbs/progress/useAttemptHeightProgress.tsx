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

    const attemptsWithHeight = data?.filter((attempt) => {
      return attempt.height || attempt.send;
    });

    if (topHeight && attemptsWithHeight && attemptsWithHeight.length) {
      const attemptHeights = attemptsWithHeight.map((attempt) => {
        const height = attempt.send ? topHeight : attempt.height;
        return (height! / topHeight) * 100;
      });
      const sendColors = attemptsWithHeight.map((attempt) => {
        return attempt.send ? "rgb(165, 255, 181)" : "rgb(255, 188, 188)";
      });

      chart = new Chart(heightChartRef.current, {
        type: "line",
        data: {
          labels: attemptsWithHeight.map((row, i) => i),
          datasets: [
            {
              borderColor: "rgb(176, 224, 255)",
              borderWidth: 1,
              label: "Attempt progress",
              data: attemptHeights,
              pointBackgroundColor: sendColors,
              pointBorderColor: sendColors,
            },
          ],
        },
        options: {
          scales: {
            y: {
              min: 0,
              max: 105,
              ticks: {
                stepSize: 20,
                callback: (value) => {
                  return Number(value) <= 100 ? value : "";
                },
              },
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
