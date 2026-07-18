import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import userApi from "@/features/users/userService";
import useCurrentUser from "./useCurrentUser";
export default function useFollowUser(author_id: number) {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const isFollowing = currentUser.following.some(
    (user) => user.id == author_id,
  );

  const toggleFollow = isFollowing
    ? () => userApi.unfollowUser({ user_id: author_id })
    : () => userApi.followUser({ user_id: author_id });

  const [error, setError] = useState<Error | null>(null);
  const { mutate: toggleFollowUser, isPending } = useMutation({
    mutationFn: toggleFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", currentUser.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", author_id],
      });
    },
    onError: (err) => {
      setError(err);
    },
  });

  return { toggleFollowUser, isFollowing, isPending, error };
}
