import ErrorMessage from "@/components/error/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import { useGetAllUsers } from "@/features/users/queries";
import type { AuthResponse } from "@shared/types";
import UserRelationTag from "@/components/UserRelationTag";
import PageHeader from "@/components/PageHeader";

export default function UsersPage(){
    const {error, isPending, userData} = useGetAllUsers();

    if(error){
        return <ErrorMessage error = {error}></ErrorMessage>
    }
    if(isPending){
        return <Spinner></Spinner>
    }

    if(!userData || !userData.length){
        return <p>No users found</p>
    }
    return <div>
        <PageHeader>Users</PageHeader>
        {userData.map((user: AuthResponse) => {
            if(user){
                return <li><UserRelationTag user = {user}></UserRelationTag></li>

            }
        })}
    </div>
}