import Button from "@/components/Button";
import { useState } from "react";
import ErrorWrapper from "@/components/error/ErrorWrapper";
import Modal from "@/components/Modal";
type RecordModalProps = {
  setRecordModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNewAttemptData: React.Dispatch<
    React.SetStateAction<{
      send: boolean;
      clip: undefined | File;
      height: undefined | number;
      leftOffset: undefined | number;
    }>
  >;
  setTagModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RecordModal({
  setNewAttemptData,
  setTagModalOpen,
  setRecordModal,
}: RecordModalProps) {
  const [clip, setClip] = useState<File | null>(null);
  const [error, setError] = useState<Error | null>(null);
  function handleClick(send: boolean) {
    if (!clip) {
      setError(Error("Please attach recording"));
      return;
    }
    setNewAttemptData({
      send: send,
      clip,
      height: undefined,
      leftOffset: undefined,
    });
    setRecordModal(false);
    setTagModalOpen(true);
  }

  return (
    // -translate-y-full
    <Modal setModal={setRecordModal}>
      {error && <ErrorWrapper>{error.message}</ErrorWrapper>}

      <label
        className="mt-7 border-1 border-black hover:bg-mist-200 rounded-sm bg-mist-100 p-5"
        htmlFor="clip"
      >
        Upload a video
      </label>

      <input
        type="file"
        name="clip"
        id="clip"
        capture="environment"
        hidden
        accept="video/*"
        onChange={(e) => {
          if (e.target.files) {
            setClip(e.target.files[0]);
          } else setClip(null);
        }}
      />

      {clip && (
        <>
          <video
            className="h-100"
            width="320"
            height="100"
            controls
            src={URL.createObjectURL(clip)}
          >
            {/* <source src={URL.createObjectURL(clip)} type="video/mp4"></source> */}
          </video>
          <div className="flex gap-2 mt-10">
            <Button
              className="bg-red-400 block"
              onClick={() => handleClick(false)}
            >
              Log Attempt
            </Button>
            <Button
              className="block bg-green-400"
              onClick={() => {
                handleClick(true);
              }}
            >
              Log Send
            </Button>

            {/* <Button
              type="submit"
              className="bg-red-400"
              onClick={() =>
                handleSubmit({ send: false, clip: clip || undefined })
              }
            >
              Log Attempt
            </Button>
            <Button
              type="submit"
              className="bg-green-400"
              onClick={() =>
                handleSubmit({ send: true, clip: clip || undefined })
              }
            >
              Log Send
            </Button> */}
          </div>
        </>
      )}
    </Modal>
  );
}
