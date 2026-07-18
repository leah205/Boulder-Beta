import postApi from "@/features/posts/postService";
import { useQuery } from "@tanstack/react-query";
import userApi from "../users/userService";

export function useGetAllPosts() {
  const { isPending, error, data } = useQuery({
    queryKey: postKeys.all,
    queryFn: async () => postApi.getFeed(),
  });

  return { isPending, error, data };
}

export function useGetUserPosts(id: number) {
  const { isPending, error, data } = useQuery({
    queryKey: postKeys.user(id),
    queryFn: async () => userApi.getUserPosts(id),
  });
  return { isPending, error, data };
}

export function useGetPost(id: number) {
  const { isPending, error, data } = useQuery({
    queryKey: postKeys.post(id),
    queryFn: async () => postApi.getPost(id),
  });
  return { isPending, error, data };
}

const postKeys = {
  all: ["posts"] as const,
  post: (id: number) => [...postKeys.all, id],
  user: (id: number) => [...postKeys.all, "user", id],
};
