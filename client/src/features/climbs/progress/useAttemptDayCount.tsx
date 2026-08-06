import type { AttemptWithVideoResponse } from "@shared/types";
import Chart from "chart.js/auto";
import { useEffect } from "react";
import "chartjs-adapter-date-fns";
import getDayCountChartData from "./utils/getDayCountChartData";

type ChartPoint = {
  x: Date;
  y: number;
};

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
      const sends = data.filter((row) => row.send == true);
      const attempts = data.filter((row) => row.send == false);

      chart = new Chart<"bar", ChartPoint[]>(countChartRef.current, {
        type: "bar",
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                precision: 0,
              },
            },
            x: {
              type: "time",
            },
          },
        },
        data: {
          datasets: [
            {
              label: "# of Attempts",
              data: getDayCountChartData(attempts),
              backgroundColor: "rgb(255, 188, 188)",
            },
            {
              label: "# of Sends",
              data: getDayCountChartData(sends),
              backgroundColor: "rgb(165, 255, 181)",
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
