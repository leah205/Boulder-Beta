import { Request, Response } from "express";
import postQueries from "./postQueries";
import { PostResponse } from "@shared/types";

const postController = {
  getPublicFeed: async (req: Request, res: Response) => {
    const feed = (await postQueries.getAllPublished()) satisfies PostResponse[];
    res.json(feed);
  },

  deletePost: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const post = (await postQueries.deletePost(id)) satisfies PostResponse;

    res.json(post);
  },

  getPost: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const post = (await postQueries.getPost(id)) satisfies PostResponse;
    res.json(post);
  },
};

export default postController;
