import type { AttemptResponse } from "@shared/types";
import Button from "@/components/Button";
import { useState } from "react";
import usePublishAttempt from "@/features/attempts/usePublishAttempt";
import Spinner from "@/components/spinner/Spinner";

type AttemptRowProps = {
  attempt: AttemptResponse & {
    uploadDate: string;
    uploadTime: string;
  };
};
function AttemptRow({ attempt }: AttemptRowProps) {
  const [showVideo, setShowVideo] = useState(false);

  const {
    publishAttempt,
    isPending: publishPending,
    error: publishError,
  } = usePublishAttempt(attempt.id);

  function toggleShowVideo() {
    setShowVideo(!showVideo);
  }
  return (
    <div>
      <div className="flex gap-3" key={attempt.id}>
        {attempt.send && <p className="text-green-400">Send </p>}
        {!attempt.send && <p className="text-red-400">Attempt</p>}
        <p>{String(attempt.uploadDate) + " " + String(attempt.uploadTime)}</p>
        {attempt.clip && (
          <Button type="button" onClick={toggleShowVideo}>
            View
            {/* <Link to={`/attempts/${attempt.id}`}>View</Link> */}
          </Button>
        )}
      </div>
      {showVideo && (
        <video width="320" height="240" controls>
          <source src={attempt.clip || undefined} type="video/mp4"></source>
        </video>
      )}

      {showVideo && !attempt.published && (
        <Button type="submit" onClick={publishAttempt}>
          Publish
        </Button>
      )}

      {publishPending && <Spinner></Spinner>}
    </div>
  );
}

type AttemptsListProps = {
  data: AttemptResponse[];
};

export default function ClimbAttemptsList({ data }: AttemptsListProps) {
  const attempts = data.map((d) => {
    const dateObj = d.uploadedAt;
    return {
      ...d,
      uploadDate:
        dateObj.getMonth() +
        "/" +
        dateObj.getDate() +
        "/" +
        dateObj.getFullYear(),
      uploadTime: dateObj.getHours() + ":" + dateObj.getMinutes(),
    };
  });

  return (
    <div>
      {attempts.map((attempt) => {
        return <AttemptRow key={attempt.id} attempt={attempt}></AttemptRow>;
      })}
    </div>
  );
}
