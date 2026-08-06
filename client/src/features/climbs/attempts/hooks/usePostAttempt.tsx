import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import attemptApi from "@/features/climbs/attempts/attemptService";

export default function usePostAttempt(attempt_id: number, climb_id: number) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);

  const { mutate: postAttempt, isPending } = useMutation({
    mutationFn: () => attemptApi.postAttempt(attempt_id),
    onSuccess: () => {
      ("success");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["climb", climb_id, "attempts"],
      });
    },
    onError: (err) => {
      setError(err);
    },
  });

  return { postAttempt, isPending, error };
}
