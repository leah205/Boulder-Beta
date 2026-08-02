import type React from "react";
import { useRef, useState } from "react";

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
  children?: React.ReactNode;
  coors: CoorType;
  setCoors: React.Dispatch<React.SetStateAction<CoorType>>;
};
export type CoorType = {
  height: number;
  leftOffset: number;
} | null;

export default function BoundingRect({ children, setCoors }: BoundingRectType) {
  const boundingRef = useRef<HTMLDivElement>(null);
  const [boxCoors, setBoxCoors] = useState<number[] | null>(null);
  console.log(boxCoors);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    console.log("yoohoo");
    if (!boundingRef.current) {
      return;
    }

    const rect = boundingRef.current.getBoundingClientRect();
    const x = e.clientX - rect!.left;
    const y = rect!.bottom - e.clientY;
    const boxHeight = rect.bottom - rect.top;
    const boxWidth = rect.right - rect.left;
    console.log(y / boxHeight);
    console.log(x / boxWidth);
    setBoxCoors([x, y]);

    setCoors({
      height: y / boxHeight,
      leftOffset: x / boxWidth,
    });
  }

  return (
    <div
      onClick={handleClick}
      ref={boundingRef}
      className="flex flex-wrap relative z-200 w-full h-full"
    >
      {boxCoors && <HeightTag y={boxCoors[1]} x={boxCoors[0]}></HeightTag>}
      {children}
    </div>
  );
}
