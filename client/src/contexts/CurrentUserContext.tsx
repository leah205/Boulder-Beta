import type React from "node_modules/@types/react/index";
import { createContext, useEffect } from "react";
import type { UserResponse } from "@shared/types";
import useAuth from "@/features/authentication/useAuth";
import userApi from "@/features/users/userService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/spinner/Spinner";

type CurrentUserContextType = {
  currentUser: UserResponse | undefined | null;
};

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
});

export default function CurrentUserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();

  const {
    isPending,
    error,
    data: currentUser,
  } = useQuery({
    queryKey: ["user", "current"],
    queryFn: async () => userApi.getUserData(user?.id),
    enabled: !!user,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["user", "current"],
    });
  }, [isAuthenticated]);

  if (isPending && isAuthenticated) {
    return <Spinner></Spinner>;
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {/* {isPending && <Spinner></Spinner>} */}
      {children}
    </CurrentUserContext.Provider>
  );
}
