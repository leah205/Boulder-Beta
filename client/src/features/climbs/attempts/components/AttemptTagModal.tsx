import ClimbPic from "../../components/ClimbPic";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import useClimb from "../../hooks/useClimb";
import { useState } from "react";
import BoundingRect from "@/components/BoundingRect";
import type { CoorType } from "@/components/BoundingRect";

type AttemptTagModalProps = {
  closeModal: () => void;
  handleSubmit: (
    height: number | undefined,
    leftOffset: number | undefined,
  ) => void;
};

export default function AttemptTagModal(props: AttemptTagModalProps) {
  const [coors, setCoors] = useState<CoorType | null>(null);
  const climbData = useClimb();

  function handleSubmitClick() {
    props.handleSubmit(coors?.height, coors?.leftOffset);
  }

  return (
    <Modal closeModal={props.closeModal}>
      <div className="flex flex-col items-center gap-6">
        <p data-testid="modal-text">Indicate the top hold you reached:</p>
        <ClimbPic
          picture={climbData.picture || undefined}
          color={climbData.color}
          className="h-80 w-80"
        >
          <BoundingRect coors={coors} setCoors={setCoors}></BoundingRect>
        </ClimbPic>
        <Button onClick={handleSubmitClick}>Submit</Button>
      </div>
    </Modal>
  );
}
