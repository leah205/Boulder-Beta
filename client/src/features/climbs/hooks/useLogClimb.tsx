import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import climbApi from "@/features/climbs/climbService";
import { CustomValidationError } from "@/utils/Error";
import type { CreateClimbRequest, ClimbResponse } from "@shared/types";

export function useClimbLog() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const { mutate: logClimb, isPending } = useMutation({
    mutationFn: (data_obj: CreateClimbRequest) => climbApi.create(data_obj),
    onSuccess: (res: ClimbResponse) => {
      queryClient.setQueryData(["climbs", res.id], res);
      navigate(`/climbs/${res.id}`);
    },
    onError: (err) => {
      if (err instanceof CustomValidationError) {
        console.log("yoohoo");
        setErrors(err.validation_errors);
      }
      if (err.message == "unauthorized") {
        navigate("/signin");
      } else {
        setErrors([err.message]);
      }
    },
  });

  return { logClimb, isPending, errors };
}
