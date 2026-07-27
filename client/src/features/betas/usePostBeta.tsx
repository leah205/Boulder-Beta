// make sure to invalidate queries!
// is it bad to invalidate so many?
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import betaApi from "./betaService";
import type { CreateBetaRequest, BetaResponse } from "@shared/types";
import { CustomValidationError } from "@/utils/Error";

export function usePostBeta(post_id: number) {
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<string[]>([]);
  errors;
  const { mutate, isPending } = useMutation({
    mutationFn: (data_obj: CreateBetaRequest) =>
      betaApi.createBeta(data_obj, post_id),
    onSuccess: (res: BetaResponse) => {
      setErrors([]);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
      return res;
    },
    onError: (err: CustomValidationError | Error) => {
      if (err instanceof CustomValidationError) {
        setErrors(err.validation_errors);
      } else {
        setErrors([err.message]);
      }
    },
  });

  return { mutate, isPending, errors };
}
