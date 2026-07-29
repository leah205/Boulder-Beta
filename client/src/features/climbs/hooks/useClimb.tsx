import { useContext } from "react";
import ClimbDataContext from "../context/ClimbDataContext";

export default function useClimb() {
  const context = useContext(ClimbDataContext);

  if (!context || !context) {
    throw new Error("context must be called within context provider");
  }

  return context;
}
