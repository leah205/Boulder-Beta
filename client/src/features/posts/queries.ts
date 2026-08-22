import postApi from "@/features/posts/postService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import userApi from "../users/userService";

type PageParam =
  | {
      cursorType: string;
      cursor: string | null;
    }
  | undefined;

export function useGetAllPosts(feedType: "following" | "all") {
  const fetchNext =
    feedType == "all" ? postApi.getFeedPage : postApi.getFollowFeed;

  const {
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
    error,
  } = useInfiniteQuery({
    queryKey: feedType == "all" ? postKeys.all : postKeys.following,
    queryFn: ({ pageParam }: { pageParam: PageParam }) => fetchNext(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.nextCursor
        ? { cursorType: "next", cursor: lastPage.nextCursor }
        : undefined,
    // getPreviousPageParam: (firstPage) =>
    //   firstPage?.prevCursor
    //     ? { cursorType: "prev", cursor: firstPage.nextCursor }
    //     : undefined,
  });

  return {
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
    error,
  };
}

export function useGetUserPosts(id: number) {
  const { isPending, error, data } = useQuery({
    queryKey: postKeys.user(id),
    queryFn: async () => userApi.getUserPosts(id),
  });
  return { isPending, error, userPosts: data };
}

export function useGetPost(id: number) {
  const { isPending, error, data } = useQuery({
    queryKey: postKeys.post(id),
    queryFn: async () => postApi.getPost(id),
  });
  return { isPending, error, data };
}

export function useGetClaps(id: number) {
  const { isPending, error, data } = useQuery({
    queryKey: postKeys.claps(id),
    queryFn: async () => postApi.getClaps(id),
  });
  return { isPending, error, data };
}

export const postKeys = {
  all: ["posts"] as const,
  following: ["posts", "following"] as const,
  post: (id: number) => [...postKeys.all, id],
  user: (id: number) => [...postKeys.all, "user", id],
  claps: (id: number) => [...postKeys.all, id, "claps"]
};
