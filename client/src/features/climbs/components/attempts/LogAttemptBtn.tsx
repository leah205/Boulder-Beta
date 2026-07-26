import type React from "react";
import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

type AttemptTagModalProps = {
  setTagModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (arg0: number | undefined) => void;
};

function AttemptTagModal(props: AttemptTagModalProps) {
  function onClick() {
    props.onSubmit(undefined);
  }
  return (
    <Modal setModal={props.setTagModal}>
      <Button onClick={onClick}>Submit</Button>
    </Modal>
  );
}

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
