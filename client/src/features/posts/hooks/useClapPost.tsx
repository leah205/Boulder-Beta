import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import postApi from "../postService";
import type { PostResponse } from "@shared/types";

export default function useClapPost(post: PostResponse) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);
  const userHasClapped = post.currentUserLiked;

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return userHasClapped ? postApi.unclapPost(post.id): postApi.clapPost(post.id)}
      ,
    onSuccess: (res: PostResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      setError(null)
    },
    onError: (err) => {
      setError(err);
    },
  });

  return { toggleClapPost: mutate, clapPending: isPending, clapError: error, userHasClapped, clapCount: post.clapCount };
}
