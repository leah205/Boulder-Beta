import Form from "@/components/form/Form";
import Button from "@/components/Button";
import type { UseMutateFunction } from "node_modules/@tanstack/react-query/build/modern/_tsup-dts-rollup";
import type { Attempt } from "@shared/types";
import { useState } from "react";
import ErrorWrapper from "@/components/error/ErrorWrapper";
type AttemptInputType = {
  send: boolean;
  clip?: File;
};

type RecordModalProps = {
  logAttempt: UseMutateFunction<Attempt, Error, AttemptInputType>;
  setRecordModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RecordModal({
  logAttempt,
  setRecordModal,
}: RecordModalProps) {
  const [clip, setClip] = useState<File | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  function handleSubmit(attempt: AttemptInputType) {
    if (!clip) {
      setError(Error("Please attach recording"));
      return;
    }
    logAttempt(attempt);
    setRecordModal(false);
  }

  return (
    <Form
      className="-translate-y-full w-1/2 bg-white  "
      enctype="multipart/form-data"
    >
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
            setClip(e.target.files[0]);
          } else setClip(undefined);
        }}
      />
      <Button type="submit" onClick={() => handleSubmit({ send: false, clip })}>
        Log Attempt
      </Button>
      <Button type="submit" onClick={() => handleSubmit({ send: true, clip })}>
        Log Send
      </Button>
      <Button type="button" onClick={() => setRecordModal(false)}>
        Cancel
      </Button>
    </Form>
  );
}
