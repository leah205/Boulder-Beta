import { useState, useEffect, useRef } from "react";
import type { FeedResponse } from "@shared/types";
import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  InfiniteData,
} from "@tanstack/react-query";

export default function useInfiniteScroll(
  prevRef: React.RefObject<HTMLDivElement | null>,
  nextRef: React.RefObject<HTMLDivElement | null>,
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<FeedResponse, unknown>, Error>
  >,
  data: InfiniteData<FeedResponse, unknown> | undefined,
  isFetchingNextPage: boolean,
) {
  const [getNext, setGetNext] = useState(false);
  const [getPrev, setGetPrev] = useState(false);

  useEffect(() => {
    const options = {
      rootMargin: "100px",
      threshold: 0,
    };

    if (!nextRef.current || !prevRef.current) {
      console.log("yoo");
      fetchNextPage();
      return;
    }

    console.log(data);

    const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(
        (entry) => {
          const element_id = entry.target.id;

          if (entry.isIntersecting) {
            if (
              element_id == "load-more" &&
              nextRef.current &&
              !isFetchingNextPage
            ) {
              console.log("fetching next");
              fetchNextPage();
            } else if (element_id == "load-prev" && prevRef.current) {
            }
          }
        },
        [data],
      );
    };

    const observer = new IntersectionObserver(intersectionCallback, options);

    observer.observe(prevRef.current as HTMLElement);
    observer.observe(nextRef.current as HTMLElement);

    return () => {
      observer.disconnect();
    };
  }, [!data]);

  return { getNext, getPrev, setGetNext, setGetPrev };
}
