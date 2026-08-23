import ProfilePic from "@/components/ProfilePic";
import type { UserResponse } from "@shared/types"
import useCurrentUser from "@/hooks/useCurrentUser";
import useFollowUser from "@/hooks/useFollowUser"
import Button from "@/components/Button";
type AboutSectionProps = {
    user: UserResponse;
    isSelf: boolean;
}

export default function AboutSection({user}: AboutSectionProps){
     const { toggleFollowUser, isFollowing, isPending, error } = useFollowUser(user.id)
    const currentUser = useCurrentUser();
    const isSelf = currentUser.id == user.id;
     
    return <>
        <div className = "flex justify-between px-8 py-5">
            <ProfilePic size = '100' username = {user.username}></ProfilePic>
        <div>
               <p className="text-xl mb-5">{user.username}</p>
            <p>Followers: {user.followedBy.length}</p>
            <p>Following: {user.following.length}</p>
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
        </div>
         
            <hr className = "mt-5"></hr>
    </>
    


}