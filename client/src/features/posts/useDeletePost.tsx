import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import postApi from "./postService";
import type { PostResponse } from "@shared/types";

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: (post_id: number) => postApi.deletePost(post_id),
    onSuccess: (res: PostResponse) => {
      res.climb_id;
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["attempts", "climb", res.climb_id],
      });
      //queryClient.setQueriesData(['posts'])
    },
    onError: (err) => {
      setError(err);
    },
  });

  return { mutate, isPending, error };
}
