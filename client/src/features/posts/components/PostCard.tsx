import BetaSection from "@/features/betas/components/BetaSection";
import type { PostResponse } from "@shared/types";
import { useState } from "react";
import Button from "@/components/Button";

type PostCardProps = {
  post: PostResponse;
};

export default function PostCard({ post }: PostCardProps) {
  const [betasOpen, setBetasOpen] = useState(false);

  const toggleBetasOpen = () =>
    betasOpen ? setBetasOpen(false) : setBetasOpen(true);
  return (
    <div className="flex justify-center">
      <div className="h-100 relative my-5">
        <video className="h-full w-50" width="320" height="100" controls>
          <source src={post.clip || undefined} type="video/mp4"></source>
        </video>
        <Button
          className="absolute z-10 bottom-0"
          type="button"
          onClick={toggleBetasOpen}
        >
          {betasOpen ? "Hide comments" : "Show Comments"}
        </Button>
        {betasOpen && (
          <BetaSection
            betas={post.betas}
            post_id={post.id}
            setBetasOpen={setBetasOpen}
          ></BetaSection>
        )}
      </div>
    </div>
  );
}
