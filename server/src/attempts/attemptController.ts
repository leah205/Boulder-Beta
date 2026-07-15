import { Request, Response } from "express";
import attemptQueries from "./attemptQueries";
import climbQueries from "@/climbs/climbQueries";
import { CreateAttemptSchema } from "@shared/types";

const attemptController = {
  createAttempt: async (req: Request, res: Response) => {
    req.body = CreateAttemptSchema.parse(req.body);
    const climb_id = Number(req.params.climb_id);
    const send = req.body.send;
    const attempt = await attemptQueries.createAttempt(climb_id, {
      clip: req.file?.path,
      ...req.body,
    });

    if (send) {
      await climbQueries.patchClimb({ sent: send }, climb_id);
    }

    res.status(200).json(attempt);
  },

  postVideo: async (req: Request, res: Response) => {
    const attempt_id = Number(req.params.attempt_id);

    const attempt = await attemptQueries.postVideo(attempt_id);
    res.status(200).json(attempt);
  },

  getVideo: async (req: Request, res: Response) => {
    const attempt_id = Number(req.params.attempt_id);
    const attempt = await attemptQueries.getAttemptWithVideo(attempt_id);
    res.status(200).json(attempt);
  },
};

export default attemptController;
