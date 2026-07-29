import { Request, Response } from "express";
import climbQueries from "./climbQueries";
//import { Prisma } from "generated/prisma/client";
import type { Climb } from "../../generated/prisma/client";
import { validationResult } from "express-validator";
import { CreateClimbSchema } from "@shared/types";
import type { ClimbResponse, AttemptWithVideoResponse } from "@shared/types";
import attemptQueries from "@/attempts/attemptQueries";

const climbController = {
  createClimb: async (req: Request, res: Response) => {
    req.body = CreateClimbSchema.parse(req.body);
    // req.body.grade = req.body.grade.length ? req.body.grade : null;
    // delete req.body.picture;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.user!.id!;
    const picture = req.file?.path;

    const climb_obj = (await climbQueries.createClimb(id, {
      picture,
      ...req.body,
    })) satisfies ClimbResponse;

    return res.json(climb_obj);
  },

  getClimb: async (req: Request, res: Response) => {
    const climb_id = Number(req.params.climb_id);
    const climb = (await climbQueries.getClimb(
      climb_id,
    )) satisfies ClimbResponse;

    return res.json(climb);
  },

  // patchClimb: async (req: Request, res: Response) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //   const id = req.user!.id;
  //   const { grade, sent, rating, attempt_num, climb_id } = req.body.climb;
  //   const climb_obj = await climbQueries.patchClimb(id, {
  //     grade,
  //     sent,
  //     rating: Number(rating),
  //     attempt_num: Number(attempt_num),
  //     id: climb_id,
  //   });
  //   return res.json({ data: climb_obj });
  // },

  getAttempts: async (req: Request, res: Response) => {
    const climb_id = Number(req.params.climb_id);
    const attempts = (await attemptQueries.getClimbAttempts(
      climb_id,
    )) satisfies AttemptWithVideoResponse[];
    res.status(200).json(attempts);
  },
};

export default climbController;
