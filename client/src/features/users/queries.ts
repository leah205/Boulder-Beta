import { useQuery } from "@tanstack/react-query";
import userApi from "./userService";

export function useGetUser(id: number, options: {
    enabled: boolean 
} = {enabled: true}) {
    console.log(id);
    const {isPending, error, data} = useQuery({
        queryKey: userKeys.user(id),
        queryFn: async () => userApi.getUserData(id),
        enabled: options.enabled
    });
    return {isPending, error, userData: data}
}

export const userKeys = {
    user: (id: number) => ["user", id] as const
}