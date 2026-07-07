import ContentSpinner from "@/components/ContentSpinner";
import useLogAttempt from "@/features/attempts/useLogAttempt";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import RecordModal from "./RecordModal";
import ClimbAttemptsList from "./ClimbAttemptsList";
import type { Attempt } from "@shared/types";

function AttemptsHeader() {
  const [recordModal, setRecordModal] = useState(false);

  const {
    logAttempt,
    isPending: logPending,
    error: logError,
  } = useLogAttempt();

  function openRecord() {
    setRecordModal(true);
  }

  return (
    <>
      {recordModal && (
        <RecordModal
          logAttempt={logAttempt}
          setRecordModal={setRecordModal}
        ></RecordModal>
      )}
      {logPending && <Spinner></Spinner>}
      <div className="flex justify-around py-5 gap-3">
        <Button
          type="submit"
          className="bg-red-400 block"
          onClick={() => logAttempt({ send: false })}
        >
          Log Attempt
        </Button>
        <Button
          type="submit"
          className="block bg-green-400"
          onClick={() => logAttempt({ send: true })}
        >
          Log Send
        </Button>
        <Button type="button" onClick={openRecord}>
          Record
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

export default function ClimbAttemptsCard({
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
      <ClimbAttemptsList data={data}></ClimbAttemptsList>
    </AttemptsCardLayout>
  );
}
