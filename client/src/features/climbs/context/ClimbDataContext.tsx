import { createContext } from "react";
import type { ClimbResponse } from "@shared/types";
type ClimbContextType = {
  climb: ClimbResponse | null;
};
const ClimbDataContext = createContext<ClimbContextType | null>(null);

export default ClimbDataContext;
