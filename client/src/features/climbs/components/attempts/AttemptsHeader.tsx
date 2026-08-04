import AttemptTagModal from "./AttemptTagModal";
import useAttemptFlow from "../../hooks/useAttemptFlow";

import Button from "@/components/Button";
import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";
import RecordModal from "./RecordModal";

export default function AttemptsHeader() {
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
          className="block"
          variant="red"
          onClick={() => {
            handleClickLogAttempt(undefined, false);
          }}
        >
          Log Attempt
        </Button>
        <Button
          className="block bg-green-300 hover:bg-green-500"
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
