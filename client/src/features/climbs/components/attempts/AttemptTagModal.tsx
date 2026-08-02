import ClimbPic from "../ClimbPic";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import useClimb from "../../hooks/useClimb";
import type React from "react";
import { useState } from "react";
import BoundingRect from "@/components/BoundingRect";
import type { CoorType } from "@/components/BoundingRect";

type AttemptTagModalProps = {
  setTagModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (
    height: number | undefined,
    leftOffset: number | undefined,
  ) => void;
};

export default function AttemptTagModal(props: AttemptTagModalProps) {
  const [coors, setCoors] = useState<CoorType | null>(null);
  const climbData = useClimb();

  function handleSubmitClick() {
    props.onSubmit(coors?.height, coors?.leftOffset);
  }

  return (
    <Modal setModal={props.setTagModal}>
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
