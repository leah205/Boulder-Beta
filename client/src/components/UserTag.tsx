import { Link } from "react-router-dom"

type UserProps = {
    user: {
    username: string;
    id: number;
  };
}

export default function UserTag({user}: UserProps){
    return <Link to = {`/profile-page/${user.id}`}>{user.username}</Link>

}