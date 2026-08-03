import type { AttemptWithVideoResponse } from "@shared/types";
import AttemptRow from "./AttemptRow";
type AttemptsListProps = {
  data: AttemptWithVideoResponse[];
};

export default function ClimbAttemptsList({ data }: AttemptsListProps) {
  return (
    <div className="md:w-200 m-auto">
      <h3 className="text-3xl  mb-5">History</h3>
      <div className="bg-mist-50 p-5 rounded-md min-h-100">
        {data.map((attempt) => {
          return <AttemptRow key={attempt.id} attempt={attempt}></AttemptRow>;
        })}
      </div>
    </div>
  );
}
