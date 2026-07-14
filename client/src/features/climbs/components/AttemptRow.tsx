import type { AttemptWithVideoResponse } from "@shared/types";
import Button from "@/components/Button";
import { useState } from "react";
import usePostAttempt from "@/features/attempts/usePostAttempt";
import Spinner from "@/components/spinner/Spinner";
import { Link } from "react-router-dom";

// type ManageClipProps = {
//   clip: string | null | undefined;
//   attempt: AttemptResponse;
// };
// function ManageClip({ clip, attempt }: ManageClipProps) {
//   return <div className = "flex">

//   </div>
// }

type AttemptVideoSectionProps = {
  attempt: AttemptWithVideoResponse & {
    uploadDate: string;
    uploadTime: string;
  };
};

function AttemptVideoSection({ attempt }: AttemptVideoSectionProps) {
  const {
    postAttempt,
    isPending: postPending,
    error: postError,
  } = usePostAttempt(attempt.id);
  return (
    <div className="flex flex-col items-center w-full">
      {postPending && <Spinner></Spinner>}
      <video width="320" height="240" controls>
        <source
          data-testid="video_source"
          src={attempt.video?.clip || undefined}
          type="video/mp4"
        ></source>
      </video>
      {attempt.video?.published ? (
        <p>posted</p>
      ) : (
        <Button type="submit" onClick={postAttempt}>
          Publish
        </Button>
      )}
    </div>
  );
}

type AttemptRowProps = {
  attempt: AttemptWithVideoResponse & {
    uploadDate: string;
    uploadTime: string;
  };
};
export default function AttemptRow({ attempt }: AttemptRowProps) {
  const [showVideo, setShowVideo] = useState(false);

  function toggleShowVideo() {
    setShowVideo(!showVideo);
  }
  return (
    <div data-testid="attempt-row">
      <div className="flex gap-3 mb-3 items-center" key={attempt.id}>
        {attempt.send && <p className="text-green-400">Send </p>}
        {!attempt.send && <p className="text-red-400">Attempt</p>}
        <p>{String(attempt.uploadDate) + " " + String(attempt.uploadTime)}</p>
        {attempt.video?.clip && (
          <Button
            type="button"
            className="h-8 w -10 flex items-center text-xs"
            onClick={toggleShowVideo}
          >
            {showVideo ? "Hide" : "View"}
          </Button>
        )}
      </div>

      {showVideo && (
        <AttemptVideoSection attempt={attempt}></AttemptVideoSection>
      )}
    </div>
  );
}
