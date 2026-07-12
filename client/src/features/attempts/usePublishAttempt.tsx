import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import attemptApi from "@/features/attempts/attemptService";

export default function usePublishAttempt(attempt_id: number) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);
  const { id: climbId } = useParams();

  const { mutate: publishAttempt, isPending } = useMutation({
    mutationFn: () => attemptApi.publishAttempt(attempt_id),
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

  return { publishAttempt, isPending, error };
}
