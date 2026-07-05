import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { UserCredentials } from "@/types/auth_types";
import { useState } from "react";

type LoginCredentials = {
  username: string;
  password: string;
};

type signinType = (
  username: string,
  password: string,
) => Promise<UserCredentials>;

export function useSignin(signin: signinType) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ username, password }: LoginCredentials) =>
      signin(username.trim(), password.trim()),

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
