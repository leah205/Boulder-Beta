import { useQuery } from "@tanstack/react-query";
import userApi from "./userService";

export function useGetUser(id: number, options: {
    enabled: boolean 
} = {enabled: true}) {
    const {isPending, error, data} = useQuery({
        queryKey: userKeys.user(id),
        queryFn: async () => userApi.getUserData(id),
        enabled: options.enabled
    });
    return {isPending, error, userData: data}
}

export function useGetAllUsers() {
    const {isPending, error, data} = useQuery({
        queryKey: userKeys.all,
        queryFn: async () => userApi.getAllUsers(),
    });
    return {isPending, error, userData: data}
}

export const userKeys = {
    all: ["users"] as const,
    user: (id: number) => ["users", id] as const
}