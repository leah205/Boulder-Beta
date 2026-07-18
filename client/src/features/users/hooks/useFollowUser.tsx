import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import userApi from "@/features/users/userService";
import type { followUserRequest } from "@shared/types";

export default function useFollowUser() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);
  const { mutate: followUser, isPending } = useMutation({
    mutationFn: (request: followUserRequest) => userApi.followUser(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", "current"],
      });

      //   queryClient.invalidateQueries({
      //     queryKey: ["users", request.user_id],
      //   });
    },
    onError: (err) => {
      setError(err);
    },
  });

  return { followUser, isPending, error };
}
