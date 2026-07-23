import Form from "@/components/form/Form";
import Button from "@/components/Button";
import type { UseMutateFunction } from "node_modules/@tanstack/react-query/build/modern/_tsup-dts-rollup";
import type { CreateAttemptRequest, AttemptResponse } from "@shared/types";
import { useState } from "react";
import ErrorWrapper from "@/components/error/ErrorWrapper";

type RecordModalProps = {
  logAttempt: UseMutateFunction<AttemptResponse, Error, CreateAttemptRequest>;
  setRecordModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RecordModal({
  logAttempt,
  setRecordModal,
}: RecordModalProps) {
  const [clip, setClip] = useState<File | null>(null);
  const [error, setError] = useState<Error | null>(null);
  function handleSubmit(attempt: CreateAttemptRequest) {
    if (!clip) {
      setError(Error("Please attach recording"));
      return;
    }
    logAttempt(attempt);
    setRecordModal(false);
  }

  return (
    // -translate-y-full
    <div
      data-testid="record-modal"
      className="absolute top-50 flex justify-center w-full "
    >
      <Form
        className=" h-50 max-w-1/2 bg-white relative m-auto min-h-70 overflow-scroll p-5 "
        enctype="multipart/form-data"
      >
        <Button
          className="absolute top-2 right-2 rounded-xl bg-red-500 w-8 h-8 flex items-center justify-center"
          type="button"
          onClick={() => setRecordModal(false)}
        >
          x
        </Button>
        {error && <ErrorWrapper>{error.message}</ErrorWrapper>}
        <label htmlFor="clip">Upload a video:</label>
        <input
          type="file"
          name="clip"
          id="clip"
          capture="environment"
          accept="video/*"
          onChange={(e) => {
            if (e.target.files) {
              console.log();
              console.log(e.target.files[0].type);
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
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
