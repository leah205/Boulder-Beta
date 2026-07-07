import Form from "@/components/Form";
import Button from "@/components/Button";
import type { UseMutateFunction } from "node_modules/@tanstack/react-query/build/modern/_tsup-dts-rollup";
import type { Attempt } from "@shared/types";
import { useState } from "react";
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
  function handleSubmit(attempt: AttemptInputType) {
    logAttempt(attempt);
    setRecordModal(false);
  }
  return (
    <Form className="absolute top-10 bg-white" enctype="multipart/form-data">
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
