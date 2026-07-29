import type React from "react";
import Form from "./form/Form";
import Button from "./Button";

type ModalProps = {
  children: React.ReactNode;
  setModal: (value: React.SetStateAction<boolean>) => void;
};
export default function Modal(props: ModalProps) {
  return (
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
          onClick={() => props.setModal(false)}
        >
          x
        </Button>
        {props.children}
      </Form>
    </div>
  );
}
