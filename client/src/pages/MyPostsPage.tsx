import { useQuery } from "@tanstack/react-query";
import userApi from "@/features/users/userService";
import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";
import FeedPostList from "@/features/posts/components/FeedPostList";

export default function MyPostsPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["myclimbs"],
    queryFn: async () => userApi.getMyPosts(),
  });
  console.log("my posts");
  console.log(data);

  if (isPending) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  return (
    <>
      <FeedPostList posts={data}></FeedPostList>
    </>
  );
}
