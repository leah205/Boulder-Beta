import { Request, Response } from "express";
import attemptQueries from "./attemptQueries";
import climbQueries from "@/climbs/climbQueries";
import { AttemptResponse, CreateAttemptSchema } from "@shared/types";

const attemptController = {
  createAttempt: async (req: Request, res: Response) => {
    req.body.send = req.body.send ? eval(req.body.send) : false;
    req.body = CreateAttemptSchema.parse(req.body);
    const climb_id = Number(req.params.climb_id);
    // const send = "send" in req.body ? eval(req.body.send) : false;
    const send = req.body.send;
    const { file, ...attempt_pass } = req.body;
    const attempt = (await attemptQueries.createAttempt(climb_id, {
      clip: file?.path,
      ...attempt_pass,
    })) satisfies AttemptResponse;

    if (send) {
      await climbQueries.patchClimb({ sent: send }, climb_id);
    }

    res.status(200).json(attempt);
  },

  publishAttempt: async (req: Request, res: Response) => {
    const attempt_id = Number(req.params.attempt_id);

    const attempt = (await attemptQueries.publishAttempt(
      attempt_id,
    )) satisfies AttemptResponse;
    res.status(200).json(attempt);
  },
};

export default attemptController;
