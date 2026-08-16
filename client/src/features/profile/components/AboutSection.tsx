import ProfilePic from "@/components/ProfilePic";
import type { UserResponse } from "@shared/types"

type AboutSectionProps = {
    user: UserResponse;
    isSelf: boolean;
}

export default function AboutSection({user}: AboutSectionProps){
    return <>
        <div className = "flex justify-between px-8 py-5">
            <ProfilePic size = '100' username = {user.username}></ProfilePic>
        <div>
               <p className="text-xl mb-5">{user.username}</p>
            <p>Followers: {user.followedBy.length}</p>
            <p>Following: {user.following.length}</p>
        </div>
        </div>
         
            <hr className = "mt-5"></hr>
    </>
    


}