import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import attemptApi from "@/features/attempts/attemptService";
import type { Attempt } from "@shared/types";
import type { AttemptInputType } from "@/types/attempt_types";
// import type { CreateClimbInput } from "@/types/climb_types";

export default function useLogAttempt() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: climbId } = useParams();
  const [error, setError] = useState<Error | null>(null);
  const { mutate: logAttempt, isPending } = useMutation({
    mutationFn: (attempt: AttemptInputType) =>
      attemptApi.logAttempt(Number(climbId), attempt),
    onSuccess: (res: Attempt) => {
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
