import type { AttemptWithVideoResponse } from "@shared/types";
import AttemptRow from "./AttemptRow";
type AttemptsListProps = {
  data: AttemptWithVideoResponse[];
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
