import { BetaResponse, createBetaSchema } from "@shared/types";
import { Request, Response } from "express";
import betaQueries from "./betaQueries";
import { AppError } from "@/Errors";
import { validationResult } from "express-validator";

const betaController = {
  createBeta: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user) {
      throw new AppError("user does not exist", 404);
    }
    req.body = createBetaSchema.parse(req.body);
    req.params;
    const post_id = Number(req.params.post_id);
    post_id;
    const beta = (await betaQueries.createBeta(
      post_id,
      req.user?.id,
      req.body,
    )) satisfies BetaResponse;
    res.status(200).json(beta);
  },
};
export default betaController;
