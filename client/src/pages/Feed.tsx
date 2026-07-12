import ErrorMessage from "@/components/error/ErrorMessage";
import ContentSpinner from "@/components/spinner/ContentSpinner";
import postApi from "@/features/posts/postService";
import { useQuery } from "@tanstack/react-query";
import type { PostResponse } from "@shared/types";
import type React from "node_modules/@types/react/index";

type FeedPostProps = {
  post: PostResponse;
};

function FeedPost(props: FeedPostProps) {
  const post = props.post;
  return (
    <div>
      {post.clip && (
        <video width="320" height="240" controls>
          <source src={post.clip} type="video/mp4"></source>
        </video>
      )}
    </div>
  );
}

type FeedPostListProps = {
  posts: PostResponse[];
};

function FeedPostList(props: FeedPostListProps) {
  return (
    <div>
      {props.posts.map((post) => {
        return <FeedPost key={post.attemptId} post={post}></FeedPost>;
      })}
    </div>
  );
}

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
    return <p>no posts found</p>;
  }

  return (
    <FeedLayout>
      <FeedPostList posts={data}></FeedPostList>
    </FeedLayout>
  );

  return;
  return <p>feed</p>;
}
