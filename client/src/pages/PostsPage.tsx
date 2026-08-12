import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";
import PostsListLayout from "@/features/posts/components/PostsListLayout";
import MyPostWrapper from "@/features/posts/components/MyPostWrapper";
import usePostsPage from "@/features/posts/hooks/usePostsPage";
import useCurrentUser from "@/hooks/useCurrentUser";
import PageHeader from "@/components/PageHeader";
import PageLayout from "@/layouts/PageLayout";
import PostCard from "@/features/posts/components/PostCard";

export default function PostsPage() {
  const {
    isPending: isPendingPosts,
    error: errorPosts,
    userPosts,
    isSelf,
  } = usePostsPage();

  if (isPendingPosts) {
    return <Spinner></Spinner>;
  }
  if (errorPosts) {
    return <ErrorMessage error={errorPosts}></ErrorMessage>;
  }

  if (!userPosts || !userPosts.length) {
    return <p className="text-center p-5">No posts found!</p>;
  }

  if(isSelf){
    return <PageLayout>
        <PageHeader>My Posts</PageHeader>
        <PostsListLayout>
        {userPosts.map((post) => {
          return (
            <MyPostWrapper
              navigateOut={false}
              key={post.id}
              post={post}
            ></MyPostWrapper>
          );
        })}
      </PostsListLayout>
    </PageLayout>
  }

  return (
    <>
    <PageLayout>
      <PageHeader>Posts</PageHeader>
      
      <PostsListLayout>
        {userPosts.map((post) => {
          return (
            <PostCard
              key={post.id}
              post={post}
            ></PostCard>
          );
        })}
      </PostsListLayout>
      </PageLayout>
    </>
  );
}
