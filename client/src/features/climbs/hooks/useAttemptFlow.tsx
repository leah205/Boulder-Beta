import { useState } from "react";
import useLogAttempt from "@/features/climbs/hooks/useLogAttempt";
import useClimb from "./useClimb";

type AttemptDataType = {
  send: boolean;
  clip: undefined | File;
  height: undefined | number;
  leftOffset: undefined | number;
};

const emptyAttempt = {
  send: false,
  clip: undefined,
  height: undefined,
  leftOffset: undefined,
};

export default function useAttemptFlow() {
  const { picture, topHeight } = useClimb();
  const [modal, setModal] = useState<"record" | "height" | null>(null);
  const [newAttemptData, setNewAttemptData] = useState<AttemptDataType>({
    send: false,
    clip: undefined,
    height: undefined,
    leftOffset: undefined,
  });

  function handleLogAttempt(overrides: Partial<AttemptDataType> = {}) {
    console.log(newAttemptData);
    logAttempt({ ...newAttemptData, ...overrides });
  }

  function handleClickLogAttempt(clip: File | undefined, send: boolean) {
    setNewAttemptData({ ...newAttemptData, clip, send });
    if (picture && !send) {
      setModal("height");
    } else {
      handleLogAttempt({ clip, send });
      setNewAttemptData({ ...emptyAttempt });
      setModal(null);
    }
  }

  function handleSubmitHeightModal(
    leftOffset: number | undefined,
    height: number | undefined,
  ) {
    handleLogAttempt({ height, leftOffset });
    setNewAttemptData({ ...emptyAttempt });
    setModal(null);
  }

  function closeModal() {
    setModal(null);
    setNewAttemptData(emptyAttempt);
  }

  const {
    logAttempt,
    isPending: logPending,
    error: logError,
  } = useLogAttempt();

  function openRecord() {
    setModal("record");
  }
  return {
    modal,
    logError,
    logPending,
    handleClickLogAttempt,
    handleSubmitHeightModal,
    openRecord,
    closeModal,
  };
}
