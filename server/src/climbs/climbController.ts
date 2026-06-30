import { Request, Response } from "express";
import climbQueries from "./climbQueries";
//import { Prisma } from "generated/prisma/client";
import type { Climb } from "../../generated/prisma/client";

const climbController = {
  createClimb: async (req: Request, res: Response) => {
    //remove when add in authentication
    const id = 1;
    const { grade, sent, rating } = req.body.climb;
    const climb_obj: Climb = await climbQueries.createClimb(id, {
      grade,
      sent,
      rating: Number(rating),
    });
    return res.json({ data: climb_obj });
  },
};

export default climbController;
