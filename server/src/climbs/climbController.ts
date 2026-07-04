import { Request, Response } from "express";
import climbQueries from "./climbQueries";
//import { Prisma } from "generated/prisma/client";
import type { Climb } from "../../generated/prisma/client";
import { validationResult } from "express-validator";
import { uploadOnCloudinary } from "@/utils/cloudinary";

const climbController = {
  createClimb: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.user!.id;

    const picturePath = req.file?.path;

    let picture = null;
    const grade = req.body.grade.length ? req.body.grade : null;
    if (picturePath) {
      picture = await uploadOnCloudinary(picturePath, req.body.climb_id);
    }
    const climb_obj: Climb = await climbQueries.createClimb(id, {
      grade,
      picture,
    });
    return res.json({ data: climb_obj });
  },

  patchClimb: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.user!.id;
    const { grade, sent, rating, attempt_num, climb_id } = req.body.climb;
    const climb_obj = await climbQueries.patchClimb(id, {
      grade,
      sent,
      rating: Number(rating),
      attempt_num: Number(attempt_num),
      id: climb_id,
    });
    return res.json({ data: climb_obj });
  },
};

export default climbController;
