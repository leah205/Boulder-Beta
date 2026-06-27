import { Request, Response } from "express";
import climbQueries from "./climbQueries";
//import { Prisma } from "generated/prisma/client";
import type { Climb } from "../../generated/prisma/client";

const climbController = {
  createClimb: async (req: Request, res: Response) => {
    //remove when add in authentication
    const id = 1;
    const { sent, attempt, caption, rating, grade, published } = req.body.climb;
    const climb_obj: Climb = await climbQueries.createClimb(id, {
      sent,
      attempt,
      caption,
      rating,
      grade,
      published,
    });
    return res.json({ data: climb_obj });
  },

  getMyClimbs: async (req: Request, res: Response) => {
    //remove when add in authentication
    const id = 1;
    const climb_obj: Climb[] = await climbQueries.getMyClimbs(id);
    return res.json({ data: climb_obj });
  },
};

export default climbController;
