import ContentSpinner from "@/components/spinner/ContentSpinner";
import Button from "@/components/Button";
import Spinner from "@/components/spinner/Spinner";
import { useState } from "react";
import RecordModal from "./RecordModal";
import ClimbAttemptsList from "./ClimbAttemptsList";
import type { AttemptWithVideoResponse } from "@shared/types";
import ErrorMessage from "@/components/error/ErrorMessage";
import AttemptTagModal from "./AttemptTagModal";
import useAttemptFlow from "../../hooks/useAttemptFlow";

function AttemptsHeader() {
  // function handleTagHeightSubmit(
  //   height: number | undefined,
  //   leftOffset: number | undefined,
  // ) {
  //   setTagModalOpen(false);

  //   logAttempt({ ...newAttemptData, height, leftOffset });
  // }
  const {
    modal,
    logPending,
    logError,
    handleClickLogAttempt,
    handleSubmitHeightModal,
    closeModal,
    openRecord,
  } = useAttemptFlow();

  return (
    <>
      {modal == "record" && (
        <RecordModal
          handleSubmit={handleClickLogAttempt}
          closeModal={closeModal}
          // logAttempt={handleLogAttempt}
          // setNewAttemptData={setNewAttemptData}
          // setTagModalOpen={setTagModalOpen}
          // setRecordModal={setRecordModal}
        ></RecordModal>
      )}
      {modal == "height" && (
        <AttemptTagModal
          closeModal={closeModal}
          handleSubmit={handleSubmitHeightModal}
        ></AttemptTagModal>
      )}
      {logPending && <Spinner></Spinner>}
      {logError && <ErrorMessage error={logError}></ErrorMessage>}
      <div className="flex justify-center py-5 gap-3">
        <Button
          className="bg-red-400 block"
          onClick={() => {
            handleClickLogAttempt(undefined, false);
          }}
        >
          Log Attempt
        </Button>
        <Button
          className="block bg-green-400"
          onClick={() => {
            handleClickLogAttempt(undefined, true);
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
  return <div className="w-full py-3 px-3">{children}</div>;
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
