import type { BetaResponse } from "@shared/types";

type betaProps = {
  beta: BetaResponse;
};

export default function beta({ beta }: betaProps) {
  return (
    <div>
      <p className="text-xs">{beta.author.username}</p>
      <p className="text-s">{beta.content}</p>
    </div>
  );
}
