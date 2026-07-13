import type { PostResponse } from "@shared/types";
import FeedPost from "./FeedPost";
type FeedPostListProps = {
  posts: PostResponse[];
};

export default function FeedPostList(props: FeedPostListProps) {
  return (
    <div className="flex flex-col justify-center gap-10 w-full">
      {props.posts.map((post) => {
        return <FeedPost key={post.attemptId} post={post}></FeedPost>;
      })}
    </div>
  );
}
