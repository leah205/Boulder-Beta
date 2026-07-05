import { Request, Response } from "express";
import attemptQueries from "./attemptQueries";
import climbQueries from "@/climbs/climbQueries";

const attemptController = {
  createAttempt: async (req: Request, res: Response) => {
    const climb_id = Number(req.params.climb_id);
    const send = "send" in req.body ? req.body.send : false;
    const attempt = await attemptQueries.createAttempt(climb_id, send);
    if (send) {
      await climbQueries.patchClimb({ sent: send }, climb_id);
    }

    res.status(200).json(attempt);
  },
};

export default attemptController;
