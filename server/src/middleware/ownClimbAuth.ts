import verifyToken from "./authenticateToken";
import type { Request, Response, NextFunction } from "express";
import climbQueries from "@/climbs/climbQueries";
import { AppError } from "@/Errors";

const ownClimbAuth = [
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const climb_id = req.params.climb_id;
    const climb = await climbQueries.getClimb(Number(climb_id));
    if (!climb) {
      throw new AppError(`climb with id ${climb_id} does not exist`, 404);
    }
    console.log(req.user?.id);
    console.log(climb.creatorId);
    const climbCreatorId = climb.creatorId;
    if (!req.user || req.user.id != climbCreatorId) {
      throw new AppError(`unauthorized to access this resource`, 401);
    }
    //req.climb = climb;
    next();
  },
];

export default ownClimbAuth;
