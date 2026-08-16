import { Link } from "react-router-dom"
import ProfilePic from "./ProfilePic";

type UserProps = {
    user: {
    username: string;
    id: number;
  };
  className?: string;
}

export default function UserTag({user, className}: UserProps){
    return <Link to = {`/profile-page/${user.id}`}>
      <div className = {`flex gap-3 ${className}`}>
        <ProfilePic size = '35' username = {user.username}></ProfilePic>
        <p>{user.username}</p>
      </div>
      
      </Link>

}