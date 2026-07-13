import type { PostResponse } from "@shared/types";

type FeedPostProps = {
  post: PostResponse;
};

export default function FeedPost(props: FeedPostProps) {
  const post = props.post;
  console.log(post.clip);
  return (
    <div className="flex justify-center">
      {post.clip && (
        <video className="h-7/10" width="320" height="100" controls>
          <source src={post.clip} type="video/mp4"></source>
        </video>
      )}
    </div>
  );
}
