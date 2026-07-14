import type { PostResponse } from "@shared/types";
import useDeletePost from "../useDeletePost";
import ErrorMessage from "@/components/error/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/Button";

type MyPostCardProps = {
  post: PostResponse;
};

export default function MyPostCard({ post }: MyPostCardProps) {
  const {
    mutate: deletePost,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeletePost();

  function onDelete(id: number) {
    deletePost(id);
  }

  return (
    <div className="flex justify-center items-center flex-col gap-3">
      {isPendingDelete && <Spinner></Spinner>}
      {errorDelete && <ErrorMessage error={errorDelete}></ErrorMessage>}
      {post.clip && (
        <video className="h-1/2" height="70" width="200" controls>
          <source src={post.clip} type="video/mp4"></source>
        </video>
      )}
      <Button
        className="bg-red-400"
        onClick={() => onDelete(post.id)}
        type="submit"
      >
        Delete Post
      </Button>
    </div>
  );
}
