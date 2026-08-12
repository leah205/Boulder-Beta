import { useQuery } from "node_modules/@tanstack/react-query/build/modern/_tsup-dts-rollup";
import userApi from "./userService";

export function useGetUser(id: number) {
    const {isPending, error, data} = useQuery({
        queryKey: userKeys.user(id),
        queryFn: async () => userApi.getUserData(id);
    })
    return {isPending, error, user: data}
}

export const userKeys = {
    user: (id: number) => ["user", id] as const
}