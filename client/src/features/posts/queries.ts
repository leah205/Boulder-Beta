import postApi from "@/features/posts/postService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import userApi from "../users/userService";
import { useState } from "react";

export function useGetAllPosts(feedType: "following" | "all") {
  const fetchNext =
    feedType == "all" ? postApi.getNextFeedPage : postApi.getFollowFeed;
  // const { isPending, error, data } = useQuery({
  //   queryKey: feedType == "all" ? postKeys.all : postKeys.following,
  //   queryFn: getData,
  // });
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, error } =
    useInfiniteQuery({
      queryKey: feedType == "all" ? postKeys.all : postKeys.following,
      queryFn: ({ pageParam }: { pageParam: string | null }) =>
        fetchNext(pageParam),
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
      //getPrevPageParam: (curPage) => curPage.prevCursor,
    });

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    error,
  };
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
