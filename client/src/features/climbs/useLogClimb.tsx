import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/auth_types";
import { useState } from "react";
import climbApi from "./climbService";
import type { Climb } from "@shared/types";
export function useClimbLog() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<string[]>([]);
  const { mutate: logClimb, isPending } = useMutation({
    mutationFn: (data_obj: Partial<Climb>) => climbApi.create(data_obj),
    onSuccess: (res: User) => {
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
