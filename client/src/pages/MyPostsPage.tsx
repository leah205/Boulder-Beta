import { useQuery } from "@tanstack/react-query";
import userApi from "@/features/users/userService";
import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";

import FeedPostList from "@/features/posts/components/FeedPostList";
import MyPostCard from "@/features/posts/components/MyPostCard";

export default function MyPostsPage() {
  const {
    isPending: isPendingPosts,
    error: errorPosts,
    data,
  } = useQuery({
    queryKey: ["posts", "me"],
    queryFn: async () => userApi.getMyPosts(),
  });

  if (isPendingPosts) {
    return <Spinner></Spinner>;
  }
  if (errorPosts) {
    return <ErrorMessage error={errorPosts}></ErrorMessage>;
  }

  if (!data.length) {
    return <p className="text-center p-5">No posts found!</p>;
  }

  return (
    <>
      <FeedPostList>
        {data.map((post) => {
          return <MyPostCard post={post}></MyPostCard>;
        })}
      </FeedPostList>
    </>
  );
}
