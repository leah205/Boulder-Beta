import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import attemptApi from "@/attempts/attemptService";
import type { Attempt } from "@shared/types";
// import type { CreateClimbInput } from "@/types/climb_types";

export default function useLogAttempt() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: climbId } = useParams();
  const [error, setError] = useState<string | null>(null);
  const { mutate: logAttempt, isPending } = useMutation({
    mutationFn: (send: boolean) => attemptApi.logAttempt(Number(climbId), send),
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
        setError(err.message);
      }
    },
  });

  return { logAttempt, isPending, error };
}
