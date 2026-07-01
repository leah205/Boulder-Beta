import { Request, Response } from "express";
import climbQueries from "./climbQueries";
//import { Prisma } from "generated/prisma/client";
import type { Climb } from "../../generated/prisma/client";
import { validationResult } from "express-validator";

const climbController = {
  createClimb: async (req: Request, res: Response) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.user.id;
    const { grade, sent, rating, attempt_num } = req.body.climb;
    const climb_obj: Climb = await climbQueries.createClimb(id, {
      grade,
      sent,
      rating: Number(rating),
      attempt_num: Number(attempt_num),
    });
    return res.json({ data: climb_obj });
  },
};

export default climbController;
