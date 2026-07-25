import type { PostResponse } from "@shared/types";
import { useState } from "react";

export default function useGetCursor(
  scrolledTop: boolean,
  scrolledBottom: boolean,
  data: PostResponse[],
) {
  const [needData, setNeedData] = useState(false);
  const [cursor, setCursor] = useState<null | number>();

  if (scrolledTop && data.prev_data) {
    setNeedData(true);
    setCursor(data[0].id);
  } else if (scrolledBottom && data.next_data) {
    setNeedData(true);
    setCursor(data[-1].id);
  } else {
    setNeedData(false);
    setCursor(null);
  }
}
