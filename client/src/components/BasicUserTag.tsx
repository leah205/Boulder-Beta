import type { AuthResponse } from "@shared/types"
import ProfilePic from "./ProfilePic"
import { Link } from "react-router-dom"

type props = {
    user: AuthResponse;
}

export default function BasicUserTag({user}: props){
     return <Link to = {`/profile-page/${user.id}`}>
     <div className = "flex gap-2" >
        
        <ProfilePic size = '20' username = {user!.username}></ProfilePic>
        <p className="text-s">{user!.username}</p> 
        
      </div>
      </Link>
}