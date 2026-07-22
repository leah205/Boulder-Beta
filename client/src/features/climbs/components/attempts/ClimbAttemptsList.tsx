import type { AttemptWithVideoResponse } from "@shared/types";
import AttemptRow from "./AttemptRow";
type AttemptsListProps = {
  data: AttemptWithVideoResponse[];
};

export default function ClimbAttemptsList({ data }: AttemptsListProps) {
  return (
    <div>
      {data.map((attempt) => {
        return <AttemptRow key={attempt.id} attempt={attempt}></AttemptRow>;
      })}
    </div>
  );
}
