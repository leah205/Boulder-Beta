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
  const otherFeedClass = `bg-mist-100 ${feedTypeClass}`;

  return (
    <div className="flex w-60 justify-between m-auto p-8">
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

function FeedLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default function Feed() {
  const [feedType, setFeedType] = useState<"following" | "all">("all");

  const nextRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);

  // const { isPending, error, data } = useGetAllPosts(getNext, getPrev, feedType);
  const { isFetchingNextPage, hasNextPage, fetchNextPage, data, error } =
    useGetAllPosts(feedType);
  console.log(isFetchingNextPage);
  const {} = useInfiniteScroll(
    prevRef,
    nextRef,
    fetchNextPage,
    data,
    isFetchingNextPage,
  );

  // if (isFetchingNextPage) {
  //   return (
  //     <FeedLayout>
  //       <ContentSpinner />
  //     </FeedLayout>
  //   );
  // }

  if (error) {
    return (
      <FeedLayout>
        <ErrorMessage error={error}></ErrorMessage>
      </FeedLayout>
    );
  }

  const postPages = data?.pages;
  console.log("first page!!!");
  console.log(data);

  if (!postPages || !postPages.length) {
    return (
      <FeedLayout>
        <FeedTypeButtons
          feedType={feedType}
          setFeedType={setFeedType}
        ></FeedTypeButtons>
        <p className="text-center">No posts found!</p>
      </FeedLayout>
    );
  }

  return (
    <FeedLayout>
      <FeedTypeButtons
        feedType={feedType}
        setFeedType={setFeedType}
      ></FeedTypeButtons>
      <div ref={prevRef} id="load-prev"></div>
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

        <div ref={nextRef} id="load-more"></div>
      </div>
    </FeedLayout>
  );
}
