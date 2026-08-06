import type { AttemptWithVideoResponse } from "@shared/types";
import { getDate } from "./getDateRange";

type ChartPoint = {
  x: Date;
  y: number;
};

export default function getDayCountChartData(data: AttemptWithVideoResponse[]) {
  const counts = new Map<string, number>();

  for (const attempt of data) {
    const day = getDate(new Date(attempt.uploadedAt));
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  const attemptChartData: ChartPoint[] = [...counts.entries()].map(
    ([day, count]) => ({
      x: new Date(day),
      y: count,
    }),
  );
  return attemptChartData;
}
