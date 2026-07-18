import MyPostCard from "@/features/posts/components/MyPostCard";
import { useParams, useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/error/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/Button";
import { useGetPost } from "@/features/posts/queries";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  return (
    <div>
      <Button type="button" onClick={() => navigate(-1)}>
        Back
      </Button>
      <MyPostCard post={data} navigateOut={true}></MyPostCard>;
    </div>
  );
}
