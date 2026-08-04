import type { PostResponse } from "@shared/types";
import useDeletePost from "../useDeletePost";
import ErrorMessage from "@/components/error/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

type MyPostCardProps = {
  post: PostResponse;
  navigateOut: boolean;
};

export default function MyPostCard({ post, navigateOut }: MyPostCardProps) {
  const navigate = useNavigate();
  const {
    mutate: deletePost,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeletePost();

  function onDelete(id: number) {
    deletePost(id);
    if (navigateOut) {
      navigate("/my-climbs");
    }
  }

  return (
    <div className="flex justify-center items-center flex-col gap-3">
      {isPendingDelete && <Spinner></Spinner>}
      {errorDelete && <ErrorMessage error={errorDelete}></ErrorMessage>}
      {/* {post.clip && (
        <video className="h-1/2" height="70" width="200" controls>
          <source src={post.clip} type="video/mp4"></source>
        </video>
      )} */}
      <PostCard post={post}></PostCard>
      <Button variant="red" onClick={() => onDelete(post.id)} type="submit">
        Delete Post
      </Button>
    </div>
  );
}
