import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import postApi from "./postService";

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: (post_id: number) => postApi.deletePost(post_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
      queryClient.invalidateQueries({
        queryKey: ["climb", "attempts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["myposts"],
      });
    },
    onError: (err) => {
      setError(err);
    },
  });

  return { mutate, isPending, error };
}
