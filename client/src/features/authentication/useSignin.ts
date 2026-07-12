import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { LoginRequest } from "@shared/types";
import type { SignInFunc } from "@/types/auth_types";

// type signinType = (
//   username: string,
//   password: string,
// ) => Promise<UserCredentials>;

export function useSignin(signin: SignInFunc) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ username, password }: LoginRequest) =>
      signin({ username: username.trim(), password: password.trim() }),

    onSuccess: (res) => {
      navigate("/");
      return res;
    },
    onError: (err) => {
      if (err.message == "unauthorized") {
        setErrors(["Username or password is incorrect"]);
      } else {
        setErrors([err.message]);
      }
    },
  });

  return { login, isPending, errors };
}
