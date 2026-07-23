import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import attemptApi from "@/features/attempts/attemptService";

export default function usePostAttempt(attempt_id: number, climb_id: number) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);

  console.log(["attempts", "climb", climb_id]);
  const { mutate: postAttempt, isPending } = useMutation({
    mutationFn: () => attemptApi.postAttempt(attempt_id),
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["attempts", "climb", climb_id],
      });
    },
    onError: (err) => {
      setError(err);
    },
  });

  return { postAttempt, isPending, error };
}
