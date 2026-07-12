import verifyToken from "./authenticateToken";
import type { Request, Response, NextFunction } from "express";
import attemptQueries from "@/attempts/attemptQueries";
import { AppError } from "@/Errors";

const ownAttemptAuth = [
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const attempt_id = req.params.attempt_id;
    const attemptWithUser = await attemptQueries.getAttemptWithUser(
      Number(attempt_id),
    );
    if (!attemptWithUser) {
      throw new AppError(`attempt with id ${attempt_id} does not exist`, 404);
    }

    const climbCreatorId = attemptWithUser.climb.creatorId;
    if (!req.user || req.user.id != climbCreatorId) {
      throw new AppError(`User is forbidden to access this resource`, 403);
    }
    //req.climb = climb;
    next();
  },
];

export default ownAttemptAuth;
