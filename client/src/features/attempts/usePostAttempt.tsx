import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import attemptApi from "@/features/attempts/attemptService";

export default function usePostAttempt(attempt_id: number) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);
  const { id: climbId } = useParams();

  const { mutate: postAttempt, isPending } = useMutation({
    mutationFn: () => attemptApi.postAttempt(attempt_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
      queryClient.invalidateQueries({
        queryKey: ["climb", "attempts", climbId],
      });
    },
    onError: (err) => {
      setError(err);
    },
  });

  return { postAttempt, isPending, error };
}
