import type React from "react";
import Form from "./form/Form";
import Button from "./Button";
import { useRef } from "react";
import useFocusModal from "@/hooks/useFocusModal";

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
};
export default function Modal(props: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useFocusModal(modalRef, props.closeModal);

  return (
    <div className="absolute inset-0 bg-black/50 h-screen z-150 ">
      <div
        data-testid="record-modal"
        className="absolute top-30 flex justify-center w-full "
      >
        <div ref={modalRef} className="max-w-4/5">
          <Form
            className=" h-50  w-full bg-white relative m-auto min-h-70 overflow-scroll p-5 "
            enctype="multipart/form-data"
          >
            <div className="mb-10">
              <Button
                className="absolute top-2 right-2  rounded-xl bg-red-500 w-6 h-6 flex items-center justify-center"
                type="button"
                onClick={() => props.closeModal()}
              >
                <span className="relative">x</span>
              </Button>
            </div>
            {props.children}
          </Form>
        </div>
      </div>
    </div>
  );
}
