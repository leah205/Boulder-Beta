import useCurrentUser from "@/hooks/useCurrentUser";
import { useParams } from "react-router-dom";
import { useGetUserPosts } from "../queries";

export default function usePostsPage(){
    const { id: id_string} = useParams();
    const id = Number(id_string);
    const currentUser = useCurrentUser();
    const isSelf = id == currentUser.id;


    const {userPosts, ...queryState} = useGetUserPosts(id);
  
    return {userPosts, isSelf, ...queryState}
}