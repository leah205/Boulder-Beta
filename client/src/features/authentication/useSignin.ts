import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/auth_types";
import { useState } from "react";

type signinType = (username: string, password: string) => Promise<User>;
interface loginCredentials {
  username: string;
  password: string;
}

export function useSignin(signin: signinType) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ username, password }: loginCredentials) =>
      signin(username.trim(), password.trim()),

    onSuccess: (res: User) => {
      navigate("/");
      return res;
    },
    onError: (err) => {
      if (err.message == "unauthorized") {
        setErrors(["Username or password is incorrect"]);
      } else {
        //change to something went wrong generic
        setErrors([err.message]);
      }
    },
  });

  return { login, isPending, errors };
}
