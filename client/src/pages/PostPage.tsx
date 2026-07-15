import MyPostCard from "@/features/posts/components/MyPostCard";
import { useParams, useNavigate } from "react-router-dom";
import postApi from "@/features/posts/postService";
import ErrorMessage from "@/components/error/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/Button";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isPending,
    error,
    data: post,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => postApi.getPost(Number(id)),
  });

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }

  if (isPending) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <Button type="button" onClick={() => navigate(-1)}>
        Back
      </Button>
      <MyPostCard post={post} navigateOut={true}></MyPostCard>;
    </div>
  );
}
