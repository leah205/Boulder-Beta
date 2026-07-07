import Form from "@/components/Form";
import Button from "@/components/Button";
import type { UseMutateFunction } from "node_modules/@tanstack/react-query/build/modern/_tsup-dts-rollup";
import type { Attempt } from "@shared/types";

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
  function handleSubmit(send: boolean) {
    logAttempt({ send: send });
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
      />
      <Button type="submit" onClick={() => handleSubmit(false)}>
        Log Attempt
      </Button>
      <Button type="submit" onClick={() => handleSubmit(true)}>
        Log Send
      </Button>
      <Button type="button" onClick={() => setRecordModal(false)}>
        Cancel
      </Button>
    </Form>
  );
}
