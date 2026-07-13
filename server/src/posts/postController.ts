import { Request, Response } from "express";
import postQueries from "./postQueries";
import { PostResponse } from "@shared/types";

const postController = {
  getPublicFeed: async (req: Request, res: Response) => {
    const feed = (await postQueries.getAllPublished()) satisfies PostResponse[];
    res.json(feed);
  },
};

export default postController;
