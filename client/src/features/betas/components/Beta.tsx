import type { BetaResponse } from "@shared/types";

type BetaProps = {
  beta: BetaResponse;
};

export default function Beta({ beta }: BetaProps) {
  return (
    <div>
      <p className="text-xs">{beta.author.username}</p>
      <p className="text-s">{beta.content}</p>
    </div>
  );
}
