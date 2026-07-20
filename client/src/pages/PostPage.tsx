import MyPostCard from "@/features/posts/components/MyPostCard";
import { useParams, useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/error/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/Button";
import { useGetPost } from "@/features/posts/queries";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAuth from "@/features/authentication/useAuth";
import PostCard from "@/features/posts/components/PostCard";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { isPending, error, data } = useGetPost(Number(id));

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }

  if (isPending) {
    return <Spinner></Spinner>;
  }

  if (!data) {
    throw new Error("data not found");
  }

  const isMyPost = user?.id == data.author.id;

  return (
    <div>
      <Button type="button" onClick={() => navigate(-1)}>
        Back
      </Button>
      {isMyPost && <MyPostCard post={data} navigateOut={true}></MyPostCard>}
      {!isMyPost && <PostCard post={data}></PostCard>}
    </div>
  );
}
