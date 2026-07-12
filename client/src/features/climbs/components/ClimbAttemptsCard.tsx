import ContentSpinner from "@/components/spinner/ContentSpinner";
import useLogAttempt from "@/features/attempts/useLogAttempt";
import Button from "@/components/Button";
import Spinner from "@/components/spinner/Spinner";
import { useState } from "react";
import RecordModal from "./RecordModal";
import ClimbAttemptsList from "./ClimbAttemptsList";
import type { AttemptResponse } from "@shared/types";
import ErrorMessage from "@/components/error/ErrorMessage";

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
      {logError && <ErrorMessage error={logError}></ErrorMessage>}
      <div className="flex justify-around py-5 gap-3">
        <Button
          type="submit"
          className="bg-red-400 block"
          onClick={() => logAttempt({ send: false, clip: null })}
        >
          Log Attempt
        </Button>
        <Button
          type="submit"
          className="block bg-green-400"
          onClick={() => logAttempt({ send: true, clip: null })}
        >
          Log Send
        </Button>
        <Button type="button" onClick={openRecord}>
          Record
        </Button>
      </div>
    </>
  );
}

function AttemptsCardLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full p-3">{children}</div>;
}

type AttemptsCardProps = {
  pending: boolean;
  error: Error | null;
  data?: AttemptResponse[];
};

export default function ClimbAttemptsCard({
  pending,
  error,
  data,
}: AttemptsCardProps) {
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
        <ErrorMessage error={error}></ErrorMessage>
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
