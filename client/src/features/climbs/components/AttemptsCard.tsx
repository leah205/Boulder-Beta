import type { Attempt } from "@shared/types";
import ContentSpinner from "@/components/ContentSpinner";
import useLogAttempt from "@/attempts/useLogAttempt";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

function AttemptDateSection();

type AttemptsListProps = {
  data: Attempt[];
};

function AttemptsList({ data }: AttemptsListProps) {
  const mappedData = data.map((d) => {
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
      {mappedData.map((attempt) => {
        return (
          <>
            <div className="flex gap-3" key={attempt.id}>
              {attempt.send && <p className="text-green-400">Send </p>}
              {!attempt.send && <p className="text-red-400">Attempt</p>}
              <p>
                {String(attempt.uploadDate) + " " + String(attempt.uploadTime)}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
}

function AttemptsHeader() {
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
    <>
      {logPending && <Spinner></Spinner>}
      <div className="flex justify-around py-5">
        <Button
          type="submit"
          className="bg-red-400 block"
          onClick={handleLogAttempt}
        >
          Log Attempt
        </Button>
        <Button
          type="submit"
          className="block bg-green-400"
          onClick={handleLogSend}
        >
          Log Send
        </Button>
      </div>
      {logError && <p>{logError}</p>}
    </>
  );
}

function AttemptsCardLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full p-3">{children}</div>;
}

type AttemptsCardProps = {
  pending: boolean;
  error: Error | null;
  data?: Attempt[];
};

export default function AttemptsCard({
  pending,
  error,
  data,
}: AttemptsCardProps) {
  console.log(data);
  if (pending) {
    return (
      <AttemptsCardLayout>
        <AttemptsHeader></AttemptsHeader>
        <ContentSpinner></ContentSpinner>
      </AttemptsCardLayout>
    );
  }

  if (error) {
    return (
      <AttemptsCardLayout>
        <AttemptsHeader></AttemptsHeader>
        <p>{error.message}</p>
      </AttemptsCardLayout>
    );
  }

  if (!data || !data.length) {
    return (
      <AttemptsCardLayout>
        <AttemptsHeader></AttemptsHeader>
        <p>Log First Attempt!</p>
      </AttemptsCardLayout>
    );
  }

  return (
    <AttemptsCardLayout>
      <AttemptsHeader></AttemptsHeader>
      <AttemptsList data={data}></AttemptsList>
    </AttemptsCardLayout>
  );
}
