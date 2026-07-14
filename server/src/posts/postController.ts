import { Request, Response } from "express";
import postQueries from "./postQueries";
import { PostResponse } from "@shared/types";
import attemptQueries from "@/attempts/attemptQueries";

const postController = {
  getPublicFeed: async (req: Request, res: Response) => {
    const feed = (await postQueries.getAllPublished()) satisfies PostResponse[];
    res.json(feed);
  },

  deletePost: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const post = postQueries.deletePost(id);

    res.json(post);
  },
};

export default postController;
