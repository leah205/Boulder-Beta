import type { AttemptWithVideoResponse } from "@shared/types";
import Chart from "chart.js/auto";
import { useEffect } from "react";
import "chartjs-adapter-date-fns";
import getDayCountChartData from "./utils/getDayCountChartData";
import { useState } from "react";

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
  const [isCountChart, setIsCountChart] = useState(false);
  useEffect(() => {
    let chart: Chart | null;

    if (!countChartRef.current) {
      setIsCountChart(false);
      return;
    }

    if (data) {
      setIsCountChart(true);
      console.log("yoohoo");
      console.log("hello????");
      const sends = data.filter((row) => row.send == true);
      const attempts = data.filter((row) => row.send == false);
      console.log(attempts)

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
              afterDataLimits: (scale) => {
                const range = scale.max - scale.min;
                const padding = range * 0.1;
                scale.min -= padding;
                scale.max += padding;
              }
             
            },
          },
          datasets: {
            bar: {
              maxBarThickness: 40,
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
    } else {
      setIsCountChart(false);
    }
    return () => {
      if (chart) chart.destroy();
    };
  }, [data]);
  return { isCountChart };
}
