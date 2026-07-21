import postApi from "@/features/posts/postService";
import { useQuery } from "@tanstack/react-query";
import userApi from "../users/userService";
import { useState } from "react";

export function useGetAllPosts() {
  const [feedType, setFeedType] = useState<"following" | "all">("all");
  const getData = feedType == "all" ? postApi.getFeed : postApi.getFollowFeed;
  const { isPending, error, data } = useQuery({
    queryKey: feedType == "all" ? postKeys.all : postKeys.following,
    queryFn: getData,
  });

  return { isPending, error, data, feedType, setFeedType };
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

export const postKeys = {
  all: ["posts"] as const,
  following: ["posts", "following"] as const,
  post: (id: number) => [...postKeys.all, id],
  user: (id: number) => [...postKeys.all, "user", id],
};
