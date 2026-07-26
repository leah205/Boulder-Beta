import { useState, useEffect } from "react";

export default function useInfiniteScroll(
  prevRef: React.RefObject<HTMLDivElement | null>,
  nextRef: React.RefObject<HTMLDivElement | null>,
  isData: boolean,
) {
  const [scrolledBottom, setScrolledBottom] = useState(false);
  const [scrolledTop, setScrolledTop] = useState(false);

  useEffect(() => {
    const options = {
      rootMargin: "50px",
      threshold: 0,
    };

    if (!nextRef.current || !prevRef.current || !isData) {
      return;
    }
    console.log(nextRef.current);

    const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const element_id = entry.target.id;
        if (entry.isIntersecting) {
          if (element_id == "load-next" && nextRef.current) {
            setScrolledBottom(true);
            setScrolledTop(false);
          } else if (element_id == "load-prev" && prevRef.current) {
            setScrolledTop(true);
            setScrolledBottom(false);
          } else {
            setScrolledTop(false);
            setScrolledBottom(false);
          }
        }
      });
    };

    const observer = new IntersectionObserver(intersectionCallback, options);

    observer.observe(prevRef.current as HTMLElement);
    observer.observe(nextRef.current as HTMLElement);

    return () => {
      observer.disconnect();
    };
  }, [isData]);

  return { scrolledBottom, scrolledTop };
}
