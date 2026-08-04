import useCurrentUser from "@/hooks/useCurrentUser";

import { useState } from "react";
import expandSvg from "@assets/expand.svg";
import collapseSvg from "@assets/collapse.svg";
import FollowingRow from "@/features/profile/components/FollowRow";

export default function ProfilePage() {
  const currentUser = useCurrentUser();
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);

  return (
    <div className="w-150 m-auto border-1 border-mist-300 h-150 my-20 p-6 max-w-4/5 bg-mist-50">
      <p className="text-xl mb-5">{currentUser.username}</p>
      <div>
        <div className="flex gap-6 justify-between pr-5">
          <p className=" bg-blue-100 rounded-md p-3 my-3 w-1/2">Following </p>
          <button onClick={() => setFollowingOpen(!followingOpen)}>
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
        <div className="flex gap-6 justify-between pr-5">
          <p className=" bg-blue-100 rounded-md p-3 my-3 w-1/2">Followers </p>
          <button onClick={() => setFollowersOpen(!followersOpen)}>
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
