import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import climbApi from "./climbService";
import type { Climb } from "@shared/types";
import type { CreateClimbInput } from "@/types/climb_types";

export function useClimbLog() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<string[]>([]);
  const { mutate: logClimb, isPending } = useMutation({
    mutationFn: (data_obj: CreateClimbInput) => climbApi.create(data_obj),
    onSuccess: (res: Climb) => {
      navigate("/");
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
