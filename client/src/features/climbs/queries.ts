import { useQuery } from "@tanstack/react-query";
import userApi from "../users/userService";
import climbApi from "./climbService";

export function useGetClimbs() {
  const { isPending, error, data } = useQuery({
    queryKey: ["climbs"],
    queryFn: async () => userApi.getMyClimbs(),
  });

  return { isPending, error, data };
}

export function useGetClimb(id: number) {
  const {
    isPending: climbLoading,
    error: climbError,
    data: climbData,
  } = useQuery({
    queryKey: ["climbs", id],
    queryFn: async () => climbApi.getClimb(id),
  });

  return { climbLoading, climbError, climbData };
}
export function useGetAttempts(climb_id: number) {
  ["climb", climb_id, "attempts"];
  const {
    isPending: attemptsLoading,
    error: attemptsError,
    data: attemptsData,
  } = useQuery({
    queryKey: ["climb", climb_id, "attempts"],
    queryFn: async () => climbApi.getAttempts(climb_id),
  });

  return { attemptsLoading, attemptsError, attemptsData };
}
