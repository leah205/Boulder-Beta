import ErrorMessage from "@/components/error/ErrorMessage";
import ContentSpinner from "@/components/spinner/ContentSpinner";
import postApi from "@/features/posts/postService";
import { useQuery } from "@tanstack/react-query";
import type React from "node_modules/@types/react/index";
import FeedPostList from "@/features/posts/components/FeedPostList";
import FeedPost from "@/features/posts/components/FeedPost";
function FeedLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default function Feed() {
  const { isPending, error, data } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => postApi.getFeed(),
  });

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
        {" "}
        <ErrorMessage error={error}></ErrorMessage>
      </FeedLayout>
    );
  }

  if (!data.length) {
    return <p className="text-center p-5">No posts found!</p>;
  }

  return (
    <FeedLayout>
      <FeedPostList>
        {data.map((post) => {
          return <FeedPost key={post.attemptId} post={post}></FeedPost>;
        })}
      </FeedPostList>
    </FeedLayout>
  );

  return;
  return <p>feed</p>;
}
