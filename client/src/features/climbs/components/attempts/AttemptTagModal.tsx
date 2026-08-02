import ClimbPic from "../ClimbPic";
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
      <p>Indicate the top hold you reached:</p>
      <BoundingRect coors={coors} setCoors={setCoors}>
        <ClimbPic
          picture={climbData.picture || undefined}
          color={climbData.color}
        ></ClimbPic>
      </BoundingRect>

      <Button onClick={handleSubmitClick}>Submit</Button>
    </Modal>
  );
}
