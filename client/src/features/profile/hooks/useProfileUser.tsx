import useCurrentUser from "@/hooks/useCurrentUser";
import { useGetUser } from "@/features/users/queries";
import { useParams } from "react-router-dom";

export default function useProfileUser(){
    const { id: id_string} = useParams();
    const id = Number(id_string);
    const currentUser = useCurrentUser();
    const isSelf = id == currentUser.id;


    const {userData, ...queryState} = useGetUser(id, {enabled: !isSelf});
    const isPending =  !isSelf && queryState.isPending;
    const error = !isSelf? queryState.error: null;
    return {user: isSelf ? currentUser : userData, isPending, error, isSelf}
}