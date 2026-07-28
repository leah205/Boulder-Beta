import ClimbPic from "../ClimbPic";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import useClimb from "../../hooks/useClimb";
import type React from "react";
import { useState } from "react";

type HeightTagProps = {
  y: number;
  x: number;
};

function HeightTag({ x, y }: HeightTagProps) {
  return (
    <div
      className="bg-red-500 w-2 h-2 rounded-full absolute z-1000 "
      style={{ bottom: y, left: x }}
    ></div>
  );
}

type BoundingRectType = {
  children: React.ReactNode;
  coors: CoorType;
  setCoors: React.Dispatch<React.SetStateAction<CoorType>>;
};
type CoorType = {
  x: number;
  y: number;
  height: number;
  leftOffset: number;
} | null;

function BoundingRect({ children, setCoors, coors }: BoundingRectType) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = rect.bottom - e.clientY;

    const boxHeight = rect.bottom - rect.top;

    setCoors({
      x,
      y,
      height: y / boxHeight,
      leftOffset: x / boxHeight,
    });
  }

  return (
    <div onClick={handleClick} className="flex flex-wrap relative">
      {coors && <HeightTag y={coors.y} x={coors.x}></HeightTag>}
      {children}
    </div>
  );
}

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
    console.log(coors?.leftOffset);
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
