import { useQuery } from "@tanstack/react-query";
import userApi from "./userService";

export function useGetUser(id: number) {
    console.log(id);
    const {isPending, error, data} = useQuery({
        queryKey: userKeys.user(id),
        queryFn: async () => userApi.getUserData(id)
    });
    return {isPending, error, user: data}
}

export const userKeys = {
    user: (id: number) => ["user", id] as const
}