import MyPostWrapper from "@/features/posts/components/MyPostWrapper";
import { useParams, useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/error/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import Button from "@/components/Button";
import { useGetPost } from "@/features/posts/queries";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAuth from "@/features/authentication/useAuth";
import PostCard from "@/features/posts/components/PostCard";
import type React from "node_modules/@types/react/index";
import PageLayout from "@/layouts/PageLayout";


export default function PostPage() {
  const { id } = useParams();

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

  if (isMyPost) {
    return (
      <PageLayout><MyPostWrapper post={data} navigateOut={true}></MyPostWrapper></PageLayout>
        
  
    );
  } else {
    return (
      <PageLayout>
        <PostCard post={data}></PostCard>
      </PageLayout>
    );
  }
}
