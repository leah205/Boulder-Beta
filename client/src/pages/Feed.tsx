import ErrorMessage from "@/components/error/ErrorMessage";
import ContentSpinner from "@/components/spinner/ContentSpinner";
import PostsListLayout from "@/features/posts/components/PostsListLayout";
import type React from "node_modules/@types/react/index";
import PostCard from "@/features/posts/components/PostCard";
import FeedPostHeader from "@/features/posts/components/FeedPostHeader";
import { useGetAllPosts } from "@/features/posts/queries";
import { useEffect, Fragment, useState, useRef } from "react";
import useInfiniteScroll from "@/features/posts/hooks/useInfiniteScroll";

type FeedTypeButtonsProps = {
  setFeedType: React.Dispatch<React.SetStateAction<"following" | "all">>;
  feedType: "all" | "following";
};

function FeedTypeButtons({ setFeedType, feedType }: FeedTypeButtonsProps) {
  const feedTypeClass = "p-3 rounded-sm text-black";
  const currentFeedClass = `bg-mist-300 ${feedTypeClass}`;
  const otherFeedClass = `bg-mist-100 hover:bg-mist-200 ${feedTypeClass} `;

  return (
    <div className="flex w-60 justify-between m-auto px-8">
      <button
        className={feedType == "all" ? currentFeedClass : otherFeedClass}
        type="button"
        onClick={() => setFeedType("all")}
      >
        All
      </button>
      <button
        type="button"
        className={feedType == "following" ? currentFeedClass : otherFeedClass}
        onClick={() => setFeedType("following")}
      >
        Following
      </button>
    </div>
  );
}

type FeedLayoutProps = {
  prevRef: React.RefObject<HTMLDivElement | null>;
  nextRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
};

function FeedLayout({ prevRef, nextRef, children }: FeedLayoutProps) {
  return (
    <PostsListLayout>
      <div ref={prevRef} id="load-prev"></div>
      {children}
      <div ref={nextRef} id="load-next"></div>
    </PostsListLayout>
  );
}

export default function Feed() {
  const [feedType, setFeedType] = useState<"following" | "all">("all");

  const nextRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);

  // const { isPending, error, data } = useGetAllPosts(getNext, getPrev, feedType);
  const {
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    fetchNextPage,
    data,
    error,
  } = useGetAllPosts(feedType);
  const isData = !!data;
  ("is there data?", isData);
  const { scrolledBottom, scrolledTop } = useInfiniteScroll(
    prevRef,
    nextRef,
    isData,
  );

  const needFetchMore = scrolledBottom && !isFetchingNextPage && hasNextPage;
  if (needFetchMore) {
    fetchNextPage();
  }

  // const needFetchPrev =
  //   scrolledTop && !isFetchingPreviousPage && hasPreviousPage;
  // ("need fetch prev" + needFetchPrev);

  if (error) {
    return (
      <FeedLayout prevRef={prevRef} nextRef={nextRef}>
        <ErrorMessage error={error}></ErrorMessage>
        <div ref={prevRef} id="load-more"></div>
      </FeedLayout>
    );
  }

  const postPages = data?.pages;
  postPages;

  if (!postPages || !postPages[0].data?.length) {
    return (
      <FeedLayout prevRef={prevRef} nextRef={nextRef}>
        <FeedTypeButtons
          feedType={feedType}
          setFeedType={setFeedType}
        ></FeedTypeButtons>
        <p className="text-center">No posts found!</p>
      </FeedLayout>
    );
  }

  return (
    <FeedLayout prevRef={prevRef} nextRef={nextRef}>
      <FeedTypeButtons
        feedType={feedType}
        setFeedType={setFeedType}
      ></FeedTypeButtons>
      <div className="flex flex-col justify-center gap-10 w-full items-center">
        {postPages.map((page) => {
          return (
            <Fragment key={page.nextCursor}>
              {page.data.map((post) => {
                return (
                  <div key={post.id} className="w-70 text-center ">
                    <FeedPostHeader author={post.author}></FeedPostHeader>
                    <PostCard key={post.attemptId} post={post}></PostCard>
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </FeedLayout>
  );
}
