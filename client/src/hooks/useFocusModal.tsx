import React, { useEffect } from "react";

export default function useFocusModal(
  ref: React.RefObject<HTMLDivElement | null>,
  setModal: (value: React.SetStateAction<boolean>) => void,
) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const modal = ref.current;
    const focusableElements = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusableElements) return;
    const firstElement = focusableElements[0];
    (firstElement as HTMLElement).focus();
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setModal(false);
      }
    }
    function handleTabPress(e: KeyboardEvent) {
      if (e.key == "Tab") {
        if (e.shiftKey && document.activeElement == firstElement) {
          e.preventDefault();
          (lastElement as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement == lastElement) {
          e.preventDefault();
          (firstElement as HTMLElement).focus();
        }
      }
    }

    const handleEscapeKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    modal?.addEventListener("keydown", handleTabPress);
    modal?.addEventListener("keydown", handleEscapeKeyPress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      modal?.removeEventListener("keydown", handleEscapeKeyPress);
      modal?.removeEventListener("keydown", handleEscapeKeyPress);

      document.body.style.overflow = "";
    };
  }, []);
}
