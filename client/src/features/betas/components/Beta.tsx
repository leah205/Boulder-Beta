import ProfilePic from "@/components/ProfilePic";
import type { BetaResponse } from "@shared/types";
import { Link } from "react-router-dom";

type betaProps = {
  beta: BetaResponse;
};

export default function beta({ beta }: betaProps) {
  return (
    <div>
      <Link to = {`/profile-page/${beta.author.id}`}>
      <div className = "flex gap-2">
        
        <ProfilePic size = '20' username = {beta.author.username}></ProfilePic>
        <p className="text-s">{beta.author.username}</p> 
        
      </div>
      </Link>
      <p className="text-s">{beta.content}</p>
    </div>
  );
}
