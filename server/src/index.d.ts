import { ClimbResponse } from "@shared/types";
import type { Climb } from "generated/prisma/client";
type JWTUser = {
  username: string;
  id: number;
};

declare global {
  namespace Express {
    interface User extends JWTUser {}

    interface Request {
      climb?: ClimbResponse;
    }
  }
}
