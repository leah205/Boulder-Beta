import ContentSpinner from "@/components/spinner/ContentSpinner";
import useLogAttempt from "@/features/climbs/useLogAttempt";
import Button from "@/components/Button";
import Spinner from "@/components/spinner/Spinner";
import { useState } from "react";
import RecordModal from "./RecordModal";
import ClimbAttemptsList from "./ClimbAttemptsList";
import type { AttemptWithVideoResponse } from "@shared/types";
import ErrorMessage from "@/components/error/ErrorMessage";
import AttemptTagModal from "./AttemptTagModal";

type AttemptDataType = {
  send: boolean;
  clip: undefined | File;
  height: undefined | number;
  leftOffset: undefined | number;
};

function AttemptsHeader() {
  const [recordModal, setRecordModal] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [newAttemptData, setNewAttemptData] = useState<AttemptDataType>({
    send: false,
    clip: undefined,
    height: undefined,
    leftOffset: undefined,
  });

  const {
    logAttempt,
    isPending: logPending,
    error: logError,
  } = useLogAttempt();

  function openRecord() {
    setRecordModal(true);
  }

  function handleTagHeightSubmit(
    height: number | undefined,
    leftOffset: number | undefined,
  ) {
    setTagModalOpen(false);

    logAttempt({ ...newAttemptData, height, leftOffset });
  }

  return (
    <>
      {recordModal && (
        <RecordModal
          // logAttempt={logAttempt}
          setNewAttemptData={setNewAttemptData}
          setTagModalOpen={setTagModalOpen}
          setRecordModal={setRecordModal}
        ></RecordModal>
      )}
      {tagModalOpen && (
        <AttemptTagModal
          setTagModal={setTagModalOpen}
          onSubmit={handleTagHeightSubmit}
        ></AttemptTagModal>
      )}
      {logPending && <Spinner></Spinner>}
      {logError && <ErrorMessage error={logError}></ErrorMessage>}
      <div className="flex justify-around py-5 gap-3">
        <Button
          className="bg-red-400 block"
          onClick={() => {
            setTagModalOpen(true);
            setNewAttemptData({
              send: false,
              clip: undefined,
              height: undefined,
              leftOffset: undefined,
            });
          }}
        >
          Log Attempt
        </Button>
        <Button
          className="block bg-green-400"
          onClick={() => {
            setTagModalOpen(true);
            setNewAttemptData({
              send: true,
              clip: undefined,
              height: undefined,
              leftOffset: undefined,
            });
          }}
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
  data?: AttemptWithVideoResponse[];
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
