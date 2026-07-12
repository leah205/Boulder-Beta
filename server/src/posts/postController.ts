import { Request, Response } from "express";
import postQueries from "./postQueries";

const postController = {
  getPublicFeed: async (req: Request, res: Response) => {
    const feed = await postQueries.getAllPublished();
    res.json(feed);
  },
};

export default postController;
