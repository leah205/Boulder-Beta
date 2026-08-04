import Button from "@/components/Button";
import { useState } from "react";
import ErrorWrapper from "@/components/error/ErrorWrapper";
import Modal from "@/components/Modal";

// type AttemptDataType = {
//   send: boolean;
//   clip: undefined | File;
//   height: undefined | number;
//   leftOffset: undefined | number;
// };

type RecordModalProps = {
  handleSubmit: (clip: File, send: boolean) => void;
  closeModal: () => void;
};

export default function RecordModal({
  handleSubmit,
  closeModal,
}: RecordModalProps) {
  const [clip, setClip] = useState<File | null>(null);
  const [error, setError] = useState<Error | null>(null);
  function handleClick(send: boolean) {
    if (!clip) {
      setError(Error("Please attach recording"));
      return;
    }
    handleSubmit(clip, send);
  }

  return (
    // -translate-y-full
    <Modal closeModal={closeModal}>
      {error && <ErrorWrapper>{error.message}</ErrorWrapper>}

      <div className="w-full flex flex-col items-center">
        <label
          className="mt-7 border-1 border-mist-300 hover:bg-mist-200 rounded-sm bg-mist-100 p-5"
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
            </div>
            <video
              className="h-100 mt-8"
              width="320"
              height="100"
              controls
              src={URL.createObjectURL(clip)}
            >
              {/* <source src={URL.createObjectURL(clip)} type="video/mp4"></source> */}
            </video>
          </>
        )}
      </div>
    </Modal>
  );
}
