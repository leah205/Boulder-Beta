import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import climbApi from "./climbService";
import type { CreateClimbRequest, ClimbResponse } from "@shared/types";

export function useClimbLog() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<string[]>([]);
  const { mutate: logClimb, isPending } = useMutation({
    mutationFn: (data_obj: CreateClimbRequest) => climbApi.create(data_obj),
    onSuccess: (res: ClimbResponse) => {
      navigate("/");
      queryClient.invalidateQueries({
        queryKey: ["myclimbs"],
      });
      return res;
    },
    onError: (err) => {
      if (err.message == "unauthorized") {
        navigate("/signin");
      } else {
        setErrors([err.message]);
      }
    },
  });

  return { logClimb, isPending, errors };
}
