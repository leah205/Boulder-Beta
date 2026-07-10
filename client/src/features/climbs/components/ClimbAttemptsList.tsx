import type { Attempt } from "@shared/types";
import Button from "@/components/Button";
import { useState } from "react";

type AttemptRowProps = {
  attempt: Attempt & {
    uploadDate: string;
    uploadTime: string;
  };
};
function AttemptRow({ attempt }: AttemptRowProps) {
  const [showVideo, setShowVideo] = useState(false);

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
    </div>
  );
}

type AttemptsListProps = {
  data: Attempt[];
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
