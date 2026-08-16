import UserTag from "./UserTag"
import Button from "./Button"
import type { AuthResponse } from "@shared/types"
import useCurrentUser from "@/hooks/useCurrentUser"
import useFollowUser from "@/hooks/useFollowUser"
import Spinner from "./spinner/Spinner"
import ErrorMessage from "./error/ErrorMessage"

type UserProps = {
    user: AuthResponse
}

export default function UserRelationTag({user}: UserProps){
    const currentUser = useCurrentUser();
     if(!user){
        throw new Error("user not found");
    }
      const { toggleFollowUser, isFollowing, isPending, error } = useFollowUser(
    user.id,
  );
   
    const isSelf = currentUser.id == user?.id;
     return <>
             {isPending && <Spinner></Spinner>}
              {error && <ErrorMessage error={error}></ErrorMessage>}
     <div className="flex gap-3 my-3">
      <UserTag user = {user}></UserTag>
            {!isSelf && (
              <Button
                type="submit"
                className="text-xs height-5 py-1"
                onClick={toggleFollowUser}
                variant={isFollowing ? "red" : "blue"}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button> )}
              </div>
              </>
}