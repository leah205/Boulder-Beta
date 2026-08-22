import BasicUserTag from "@/components/BasicUserTag";
import type { BetaResponse } from "@shared/types";
import { Link } from "react-router-dom";


type betaProps = {
  beta: BetaResponse;
};

export default function beta({ beta }: betaProps) {
  return (
    <div>
      <Link to = {`/profile-page/${beta.author.id}`}>
      <BasicUserTag user = {beta.author}></BasicUserTag>
      </Link>
      <p className="text-s">{beta.content}</p>
    </div>
  );
}
