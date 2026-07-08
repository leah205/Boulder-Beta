import { Request, Response } from "express";
import attemptQueries from "./attemptQueries";
import climbQueries from "@/climbs/climbQueries";
import { uploadOnCloudinary } from "@/utils/cloudinary";

const attemptController = {
  createAttempt: async (req: Request, res: Response) => {
    const climb_id = Number(req.params.climb_id);
    const send = "send" in req.body ? eval(req.body.send) : false;
    const public_id = req.file?.path
      ? await uploadOnCloudinary(req.file.path, "video")
      : null;
    const attempt = await attemptQueries.createAttempt(climb_id, {
      public_id,
      send,
    });

    if (send) {
      await climbQueries.patchClimb({ sent: send }, climb_id);
    }

    res.status(200).json(attempt);
  },
};

export default attemptController;
