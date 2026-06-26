import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "./auth_service";
import { CustomValidationError } from "../../Error";
import { useState } from "react";
//import type { ValidationErrorType } from "../../types/error_types";

interface FormDataType {
  username: string;
  password: string;
  confirm_password: string;
}

export function useSignup() {
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (formData: FormDataType) => {
      const { username, password, confirm_password } = formData;
      return await api.signup(
        username.trim(),
        password.trim(),
        confirm_password.trim(),
      );
    },
    onSuccess: () => {
      navigate("/signin");
    },
    onError: (error: Error | CustomValidationError) => {
      if (error instanceof CustomValidationError) {
        setErrors(error.validation_errors);
      } else {
        setErrors([error.message]);
      }
    },
  });
  return { signup, isPending, errors };
}
