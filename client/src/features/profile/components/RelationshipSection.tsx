import type { UserResponse } from "@shared/types"
import { useState } from "node_modules/@types/react/index";
import expandSvg from "@assets/expand.svg";
import collapseSvg from "@assets/collapse.svg";
import FollowingRow from "@/features/profile/components/FollowRow";

type RelationshipSectionProps = {
    user: UserResponse
}

export default function RelationshipSection({user}: RelationshipSectionProps){
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
    return    <div>
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
            user.following.map((user) => {
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
            user.followedBy.map((user) => {
              return <p key={user.id}>{user.username}</p>;
            })}
        </ul>
      </div>

}