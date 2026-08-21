import { Request, Response } from "express";
import postQueries from "./postQueries";
import { ClapResponse, FeedResponse, PostResponse } from "@shared/types";
import { id } from "zod/v4/locales";
import clapQueries from "@/claps/clapQueries";

const postController = {
  getFeedPage: async (req: Request, res: Response) => {
    const cursor = req.query.cursor?.length ? req.query.cursor : null;
    const limit = req.query.limit?.length ? Number(req.query.limit) : 3;
    const userId = req.user!.id
    const nextFeedPage = (await postQueries.getFeedPage(
      userId,
      cursor as string | null,
      limit,
    )) satisfies FeedResponse;
    res.json(nextFeedPage);
  },

  getFollowingPage: async (req: Request, res: Response) => {
    const cursor = req.query.cursor?.length ? req.query.cursor : null;
    const userId = req.user!.id

    const limit = req.query.limit?.length ? Number(req.query.limit) : 3;

    const nextFeedPage = (await postQueries.getFollowingPage(
      userId,
      cursor as string | null,
      limit,
    )) satisfies FeedResponse;
    res.json(nextFeedPage);
  },

  deletePost: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user_id = req.user!.id;
    const post = (await postQueries.deletePost(id, user_id )) satisfies PostResponse;

    res.json(post);
  },

  getPost: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const userId = req.user!.id;
    const post = (await postQueries.getPost(id, userId)) satisfies PostResponse;
    res.json(post);
  },
  postVideo: async (req: Request, res: Response) => {
    const attempt_id = Number(req.params.attempt_id);

    const attempt = await postQueries.postVideo(attempt_id);
    res.status(200).json(attempt);
  },

  getClaps: async (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    const claps = await clapQueries.getClaps(postId) satisfies ClapResponse[]
    res.json(claps)
  }
  
};

export default postController;
