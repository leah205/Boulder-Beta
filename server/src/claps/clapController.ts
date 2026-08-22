import clapQueries from "./clapQueries";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@/Errors";
import { ClapResponse } from "@shared/types";
const clapController = {
  postClap: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("user does not exist", 404);
    }
    const user_id = req.user?.id;

    const post_id = Number(req.params.post_id);

    const clap = (await clapQueries.createClap(
      post_id,
      user_id,
    )) satisfies ClapResponse;
    res.json(clap);
  },
  postUnclap: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("user does not exist", 404);
    }
    const user_id = req.user?.id;

    const post_id = Number(req.params.post_id);

    const clap = (await clapQueries.removeClap(
      post_id,
      user_id,
    )) satisfies ClapResponse;
    res.json(clap);
  },

 
};

export default clapController;
