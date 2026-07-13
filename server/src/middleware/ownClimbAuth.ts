import type { Request, Response, NextFunction } from "express";
import climbQueries from "@/climbs/climbQueries";
import { AppError } from "@/Errors";

const ownClimbAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("authentcation");
  const climb_id = req.params.climb_id;
  const climb = await climbQueries.getClimb(Number(climb_id));
  if (!climb) {
    throw new AppError(`climb with id ${climb_id} does not exist`, 404);
  }

  const climbCreatorId = climb.creatorId;
  if (!req.user || req.user.id != climbCreatorId) {
    console.log("yoohoo");
    throw new AppError(`User is forbidden to access this resource`, 403);
  }
  //req.climb = climb;
  next();
};

export default ownClimbAuth;
