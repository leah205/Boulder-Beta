import { Request, Response, NextFunction } from "express";
import climbQueries from "./climbQueries";
//import { Prisma } from "generated/prisma/client";
import type { Climb } from "../../generated/prisma/client";

const climbController = {
  createClimb: async (req: Request, res: Response, next: NextFunction) => {
    //how to only add parameters i want into object
    // add climbing stats object

    //remove when add in authentication
    const id = 1;
    const climb_obj: Climb = await climbQueries.createClimb(id, req.body.climb);
    return res.json({ data: climb_obj });
  },
};

export default climbController;
