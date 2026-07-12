import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import attemptApi from "@/features/attempts/attemptService";
import type { CreateAttemptRequest, AttemptResponse } from "@shared/types";

export default function useLogAttempt() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: climbId } = useParams();
  const [error, setError] = useState<Error | null>(null);
  const { mutate: logAttempt, isPending } = useMutation({
    mutationFn: (attempt: CreateAttemptRequest) =>
      attemptApi.logAttempt(Number(climbId), attempt),
    onSuccess: (res: AttemptResponse) => {
      navigate(`/climbs/${climbId}`);
      queryClient.invalidateQueries({
        queryKey: ["climb", "attempts", climbId],
      });

      return res;
    },
    onError: (err) => {
      if (err.message == "unauthorized") {
        navigate("/signin");
      } else {
        setError(err);
      }
    },
  });

  return { logAttempt, isPending, error };
}
