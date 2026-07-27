import Button from "@/components/Button";
import AttemptTagModal from "./AttemptTagModal";
import { useState } from "react";

type LogAttemptBtnProps = {
  children: React.ReactNode;
  className: string;
  onSubmit: (arg0: number | undefined) => void;
};
export default function LogAttemptBtn(props: LogAttemptBtnProps) {
  const [modalOpen, setModalOpen] = useState(false);
  function handleClick() {
    setModalOpen(true);
  }
  return (
    <>
      {modalOpen && (
        <AttemptTagModal
          setTagModal={setModalOpen}
          onSubmit={props.onSubmit}
        ></AttemptTagModal>
      )}
      <Button className={props.className} onClick={handleClick}>
        {props.children}
      </Button>
    </>
  );
}
