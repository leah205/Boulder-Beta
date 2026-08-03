import BetaSection from "@/features/betas/components/BetaSection";
import type { PostResponse } from "@shared/types";
import { useState } from "react";
import Button from "@/components/Button";
import betasIcon from "@assets/betas.svg";
import { getDateAndTime } from "@/utils/formatDate";

type PostCardProps = {
  post: PostResponse;
};

export default function PostCard({ post }: PostCardProps) {
  const [betasOpen, setBetasOpen] = useState(false);

  const toggleBetasOpen = () =>
    betasOpen ? setBetasOpen(false) : setBetasOpen(true);
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className=" relative mb-5 w-60">
        <video className="w-full" width="320" height="100" controls>
          <source src={post.clip || undefined} type="video/mp4"></source>
        </video>
        <Button
          className="absolute z-10 bottom-0 right-3 bg-transparent hover:bg-transparent"
          type="button"
          onClick={toggleBetasOpen}
        >
          {!betasOpen && (
            <img
              className="h-8"
              src={betasIcon}
              data-testid="open-beta-btn"
            ></img>
          )}
        </Button>
        {betasOpen && (
          <BetaSection
            betas={post.betas}
            post_id={post.id}
            setBetasOpen={setBetasOpen}
          ></BetaSection>
        )}
      </div>
      <p className=" bg-blue-100 rounded-md p-3">
        {getDateAndTime(post.uploadedAt)}
      </p>
    </div>
  );
}
