import ErrorMessage from "@/components/error/ErrorMessage";
import ContentSpinner from "@/components/spinner/ContentSpinner";

import type React from "node_modules/@types/react/index";
import FeedPostList from "@/features/posts/components/FeedPostList";
import PostCard from "@/features/posts/components/PostCard";
import FeedPostHeader from "@/features/posts/components/FeedPostHeader";
import { useGetAllPosts } from "@/features/posts/queries";

function FeedLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default function Feed() {
  const { isPending, error, data } = useGetAllPosts();

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
    return <p className="text-center p-5">No posts found!</p>;
  }

  return (
    <FeedLayout>
      <FeedPostList>
        {data.map((post) => {
          return (
            <div className="w-70 text-center ">
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
