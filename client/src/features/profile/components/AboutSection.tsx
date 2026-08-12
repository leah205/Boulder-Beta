import type { UserResponse } from "@shared/types"

type AboutSectionProps = {
    user: UserResponse
}

export default function AboutSection({user}: AboutSectionProps){
    return <p className="text-xl mb-5">{user.username}</p>

}