import { Request, Response } from "express";
import postQueries from "./postQueries";
import { FeedResponse, PostResponse } from "@shared/types";
import { id } from "zod/v4/locales";

const postController = {
  getFeedPage: async (req: Request, res: Response) => {
    const cursor = req.query.cursor?.length ? req.query.cursor : null;
    const limit = req.query.limit?.length ? Number(req.query.limit) : 3;

    const nextFeedPage = (await postQueries.getFeedPage(
      cursor as string | null,
      limit,
    )) satisfies FeedResponse;
    res.json(nextFeedPage);
  },

  getFollowingPage: async (req: Request, res: Response) => {
    const cursor = req.query.cursor?.length ? req.query.cursor : null;

    const limit = req.query.limit?.length ? Number(req.query.limit) : 3;

    const user_id = req.user!.id;
    const nextFeedPage = (await postQueries.getFollowingPage(
      user_id,
      cursor as string | null,
      limit,
    )) satisfies FeedResponse;
    res.json(nextFeedPage);
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
