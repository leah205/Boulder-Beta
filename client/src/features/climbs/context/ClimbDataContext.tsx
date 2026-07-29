import { createContext } from "react";
import type { ClimbResponse } from "@shared/types";
// type ClimbContextType = ClimbResponse | null
const ClimbDataContext = createContext<ClimbResponse | undefined>(undefined);

export default ClimbDataContext;
