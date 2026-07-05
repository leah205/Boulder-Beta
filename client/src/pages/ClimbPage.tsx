import climbApi from "@/features/climbs/climbService";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { useParams } from "react-router-dom";
import type { Attempt, Climb } from "@shared/types";
import Button from "@/components/Button";
import useLogAttempt from "@/attempts/useLogAttempt";
interface ClimbCardProps {
  pending: boolean;
  error: Error | null;
  data?: Climb;
}

function ClimbCard({ pending, error, data }: ClimbCardProps) {
  if (pending) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    throw new Error("climb not found!");
  }

  return (
    <div>
      {data.picture && <img src={data.picture || undefined}></img>}
      {data.grade && <p>{data.grade}</p>}
      <p>{data.color}</p>
    </div>
  );
}

interface AttemptsCardProps {
  pending: boolean;
  error: Error | null;
  data?: Attempt[];
}

function AttemptsCard({ pending, error, data }: AttemptsCardProps) {
  if (pending) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const {
    logAttempt,
    isPending: logPending,
    error: logError,
  } = useLogAttempt();

  function handleLogAttempt() {
    logAttempt(false);
  }

  function handleLogSend() {
    logAttempt(true);
  }

  return (
    <div>
      {logPending && <Spinner></Spinner>}
      {logError && <p>{error}</p>}
      <Button type="submit" className="block" onClick={handleLogAttempt}>
        Log Attempt
      </Button>
      <Button type="submit" className="block" onClick={handleLogSend}>
        Log Send
      </Button>
      {data &&
        data.map((attempt) => {
          console.log(String(attempt.send));
          return (
            <>
              <p>Attempted: {String(attempt.uploadedAt)}</p>
              <p>Sent: {String(attempt.send)}</p>
            </>
          );
        })}
    </div>
  );
}

export default function ClimbPage() {
  const { id: climbId } = useParams();
  const {
    isPending: climbLoading,
    error: climbError,
    data: climbData,
  } = useQuery({
    queryKey: ["climb", climbId],
    queryFn: async () => climbApi.getClimb(Number(climbId)),
  });

  const {
    isPending: attemptsLoading,
    error: attemptsError,
    data: attemptsData,
  } = useQuery({
    queryKey: ["climb", "attempts", climbId],
    queryFn: async () => climbApi.getAttempts(Number(climbId)),
  });

  return (
    <>
      <ClimbCard
        pending={climbLoading}
        error={climbError}
        data={climbData}
      ></ClimbCard>

      <AttemptsCard
        pending={attemptsLoading}
        error={attemptsError}
        data={attemptsData}
      ></AttemptsCard>
    </>
  );
}
