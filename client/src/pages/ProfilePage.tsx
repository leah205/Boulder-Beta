import useAuth from "@/features/authentication/useAuth";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFollowUser from "@/hooks/useFollowUser";
import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";
import { useState } from "react";
import expandSvg from "@assets/expand.svg";
import collapseSvg from "@assets/collapse.svg";

type FollowingRowProps = {
  user: {
    id: number;
    username: string;
  };
};

function FollowingRow({ user }: FollowingRowProps) {
  const { toggleFollowUser, isPending, error } = useFollowUser(user.id);

  function clickUnfollow(e) {
    e.preventDefault();
    toggleFollowUser();
  }

  return (
    <div className="flex gap-3">
      {isPending && <Spinner></Spinner>}
      {error && <ErrorMessage error={error}></ErrorMessage>}
      <p>{user.username}</p>
      <button
        className="bg-red-400 p-3 h-5 text-xs flex items-center rounded-sm text-white"
        onClick={clickUnfollow}
      >
        Unfollow
      </button>
    </div>
  );
}

export default function ProfilePage() {
  const currentUser = useCurrentUser();
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);

  return (
    <div className="w-80 m-auto border-1 h-100 my-10 p-6 max-w-4/5 bg-mist-50">
      <p className="text-xl mb-5">{currentUser.username}</p>
      <div>
        <div className="flex gap-6">
          <p className=" bg-blue-100 rounded-md p-3 my-3">Following </p>
          <button onClick={(e) => setFollowingOpen(!followingOpen)}>
            <img
              src={followingOpen ? collapseSvg : expandSvg}
              className="w-10"
            ></img>
          </button>
        </div>
        <ul>
          {followingOpen &&
            currentUser.following.map((user) => {
              return <FollowingRow user={user} key={user.id}></FollowingRow>;
            })}
        </ul>
        <div className="flex gap-6">
          <p className=" bg-blue-100 rounded-md p-3 my-3">Followers </p>
          <button onClick={(e) => setFollowersOpen(!followersOpen)}>
            <img
              src={followersOpen ? collapseSvg : expandSvg}
              className="w-10"
            ></img>
          </button>
        </div>
        <ul>
          {followersOpen &&
            currentUser.followedBy.map((user) => {
              return <p key={user.id}>{user.username}</p>;
            })}
        </ul>
      </div>
    </div>
  );
}
