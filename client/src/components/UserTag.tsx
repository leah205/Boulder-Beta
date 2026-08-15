import { Link } from "react-router-dom"
import ProfilePic from "./ProfilePic";

type UserProps = {
    user: {
    username: string;
    id: number;
  };
}

export default function UserTag({user}: UserProps){
    return <Link to = {`/profile-page/${user.id}`}>
      <div className = "flex gap-3">
        <ProfilePic size = '35' username = {user.username}></ProfilePic>
        <p>{user.username}</p>
      </div>
      
      </Link>

}