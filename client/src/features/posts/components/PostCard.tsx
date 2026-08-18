import BetaSection from "@/features/betas/components/BetaSection";
import type { PostResponse } from "@shared/types";
import { useState } from "react";
import Spinner from "@/components/spinner/Spinner";
import betasIcon from "@assets/betas.svg";
import { getDateAndTime } from "@/utils/formatDate";
import ErrorWrapper from "@/components/error/ErrorWrapper";
import ClapIcon from "@assets/clap.svg"
import ClappedIcon from "@assets/clapped.svg"
import useClapPost from "../hooks/useClapPost";
import ErrorMessage from "@/components/error/ErrorMessage";

type PostCardProps = {
  post: PostResponse;
};

export default function PostCard({ post }: PostCardProps) {
  const [betasOpen, setBetasOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {toggleClapPost, clapPending, clapError, userHasClapped} = useClapPost(post);
  console.log(clapError)

  const toggleBetasOpen = () =>
    betasOpen ? setBetasOpen(false) : setBetasOpen(true);
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className=" relative mb-5 w-80 ">
        {videoError && (
          <ErrorWrapper>
            <p>There was an error playing this clip.</p>
          </ErrorWrapper>
        )}
        {clapError && <ErrorMessage error = {clapError}></ErrorMessage>}
        <video
          className={`w-full ${videoError || loading ? "h-120" : ""}`}
          controls
        >
          <source
            src={post.clip || undefined}
            type="video/mp4"
            onError={() => {
              setVideoError(true);
            }}
            onLoadStart={() => setLoading(true)}
            onCanPlay={() => {
              setVideoError(false);
              setLoading(false);
            }}
          ></source>
        </video>
        {clapPending && <Spinner></Spinner>}
        {!betasOpen && <div className="bg-black/50 absolute z-10 bottom-50 right-0 rounded-md flex flex-col gap-3 px-2 py-5 bg-mist">
           <button onClick = {(e) => toggleClapPost()} >
           <img src = {userHasClapped ? ClappedIcon: ClapIcon} className = "h-12"></img>
        </button>
        <button
          className="bg-transparent hover:bg-transparent"
          type="button"
          onClick={toggleBetasOpen}
        >
        
            <img
              className="h-12"
              src={betasIcon}
              data-testid="open-beta-btn"
            ></img>
        
         
        </button>
       
        </div>}
        
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
