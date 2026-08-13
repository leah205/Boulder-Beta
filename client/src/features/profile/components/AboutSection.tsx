import type { UserResponse } from "@shared/types"

type AboutSectionProps = {
    user: UserResponse;
    isSelf: boolean;
}

export default function AboutSection({user}: AboutSectionProps){
    return <div>
            <p className="text-xl mb-5">{user.username}</p>
            <p>Followers: {user.followedBy.length}</p>
            <p>Following: {user.following.length}</p>
            <hr className = "mt-5"></hr>
    </div>
    


}