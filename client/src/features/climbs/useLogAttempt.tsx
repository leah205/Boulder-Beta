import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import climbApi from "@/features/climbs/climbService";
import type { CreateAttemptRequest, AttemptResponse } from "@shared/types";

export default function useLogAttempt() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: climbId } = useParams();
  const [error, setError] = useState<Error | null>(null);
  const { mutate: logAttempt, isPending } = useMutation({
    mutationFn: (attempt: CreateAttemptRequest) =>
      climbApi.logAttempt(Number(climbId), attempt),
    onSuccess: (res: AttemptResponse) => {
      navigate(`/climbs/${climbId}`);
      console.log(["climb", climbId, "attempts"]);
      queryClient.invalidateQueries({
        queryKey: ["climb", Number(climbId), "attempts"],
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
