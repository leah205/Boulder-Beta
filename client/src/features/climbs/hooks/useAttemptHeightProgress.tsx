type useAttemptHeightProgressProps = {};
import type { AttemptWithVideoResponse } from "@shared/types";
import Chart from "chart.js/auto";
import { useEffect } from "react";

type ParamTypes = {
  heightChartRef: React.RefObject<HTMLCanvasElement | null>;
  data: AttemptWithVideoResponse[] | undefined;
};
export default function useAttemptHeightProgress({
  heightChartRef,
  data,
}: ParamTypes) {
  useEffect(() => {
    let chart: Chart | null;
    if (!heightChartRef.current) {
      return;
    }
    const attemptsWithHeight = data?.filter((attempt) => attempt.height);

    if (attemptsWithHeight && attemptsWithHeight.length) {
      chart = new Chart(heightChartRef.current, {
        type: "line",
        data: {
          labels: attemptsWithHeight.map((row, i) => i),
          datasets: [
            {
              label: "Attempt progress",
              data: attemptsWithHeight.map((row) => row.height),
            },
          ],
        },
      });
    }
    return () => {
      if (chart) chart.destroy();
    };
  }, [data]);
}
