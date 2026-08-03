type useAttemptHeightProgressProps = {};
import type { AttemptWithVideoResponse } from "@shared/types";
import Chart from "chart.js/auto";
import { useEffect } from "react";

type ParamTypes = {
  countChartRef: React.RefObject<HTMLCanvasElement | null>;
  data: AttemptWithVideoResponse[] | undefined;
};
export default function useAttemptDayCount({
  countChartRef,
  data,
}: ParamTypes) {
  useEffect(() => {
    let chart: Chart | null;
    if (!countChartRef.current) {
      return;
    }

    if (data) {
      const days = data.map((row) => {
        const date = new Date(row.uploadedAt);
        return date.getDay();
      });
      const dayObj = days.reduce(
        (acc, day) => {
          acc[day] = (acc[day] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      chart = new Chart(countChartRef.current, {
        type: "bar",
        data: {
          labels: Object.keys(dayObj),

          datasets: [
            {
              label: "Attempts per day",
              data: Object.values(dayObj),
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
