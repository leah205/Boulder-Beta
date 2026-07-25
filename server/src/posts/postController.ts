import { Request, Response } from "express";
import postQueries from "./postQueries";
import { FeedResponse, PostResponse } from "@shared/types";

const postController = {
  getPublicFeed: async (req: Request, res: Response) => {
    const feed = (await postQueries.getAllPublished()) satisfies PostResponse[];
    console.log(typeof feed[0].uploadedAt);
    res.json(feed);
  },

  getNextFeedPage: async (req: Request, res: Response) => {
    const cursor = req.query.cursor?.length ? req.query.cursor : null;
    const nextFeedPage = (await postQueries.getNextFeedPage(
      cursor as string,
    )) satisfies FeedResponse;
    res.json(nextFeedPage);
  },

  getFollowingPosts: async (req: Request, res: Response) => {
    const user = req.user;
    const feed = (await postQueries.getFollowingPosts(
      user!.id,
    )) satisfies PostResponse[];
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
