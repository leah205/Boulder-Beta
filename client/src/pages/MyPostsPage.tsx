import { useMutation, useQuery } from "@tanstack/react-query";
import userApi from "@/features/users/userService";
import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";
import Button from "@/components/Button";
import useDeletePost from "@/features/posts/useDeletePost";
export default function MyPostsPage() {
  const {
    isPending: isPendingPosts,
    error: errorPosts,
    data,
  } = useQuery({
    queryKey: ["myposts"],
    queryFn: async () => userApi.getMyPosts(),
  });

  const {
    mutate: deletePost,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeletePost();

  function onDelete(id: number) {
    deletePost(id);
  }

  if (isPendingPosts || isPendingDelete) {
    return <Spinner></Spinner>;
  }
  if (errorPosts) {
    return <ErrorMessage error={errorPosts}></ErrorMessage>;
  }
  return (
    <>
      <div className="flex flex-col justify-center gap-10 w-full">
        {data.map((post) => {
          return (
            <div className="flex justify-center items-center flex-col gap-3">
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
        })}
      </div>
    </>
  );
}
