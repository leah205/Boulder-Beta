import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";
import PostsListLayout from "@/features/posts/components/PostsListLayout";
import MyPostWrapper from "@/features/posts/components/MyPostWrapper";
import { useGetUserPosts } from "@/features/posts/queries";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function MyPostsPage() {
  const currentUser = useCurrentUser();
  const {
    isPending: isPendingPosts,
    error: errorPosts,
    data,
  } = useGetUserPosts(currentUser.id);

  if (isPendingPosts) {
    return <Spinner></Spinner>;
  }
  if (errorPosts) {
    return <ErrorMessage error={errorPosts}></ErrorMessage>;
  }

  if (!data || !data.length) {
    return <p className="text-center p-5">No posts found!</p>;
  }

  return (
    <>
      <PostsListLayout>
        {data.map((post) => {
          return (
            <MyPostWrapper navigateOut={false} post={post}></MyPostWrapper>
          );
        })}
      </PostsListLayout>
    </>
  );
}
