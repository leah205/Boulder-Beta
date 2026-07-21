import ErrorMessage from "@/components/error/ErrorMessage";
import ContentSpinner from "@/components/spinner/ContentSpinner";

import type React from "node_modules/@types/react/index";
import FeedPostList from "@/features/posts/components/FeedPostList";
import PostCard from "@/features/posts/components/PostCard";
import FeedPostHeader from "@/features/posts/components/FeedPostHeader";
import { useGetAllPosts } from "@/features/posts/queries";
import Button from "@/components/Button";

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
  const { isPending, error, data, feedType, setFeedType } = useGetAllPosts();

  if (isPending) {
    return (
      <FeedLayout>
        <ContentSpinner />
      </FeedLayout>
    );
  }

  if (error) {
    return (
      <FeedLayout>
        <ErrorMessage error={error}></ErrorMessage>
      </FeedLayout>
    );
  }

  if (!data || !data.length) {
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
      <FeedPostList>
        {data.map((post) => {
          return (
            <div key={post.id} className="w-70 text-center ">
              <FeedPostHeader author={post.author}></FeedPostHeader>
              <PostCard key={post.attemptId} post={post}></PostCard>
            </div>
          );
        })}
      </FeedPostList>
    </FeedLayout>
  );

  return;
  return <p>feed</p>;
}
