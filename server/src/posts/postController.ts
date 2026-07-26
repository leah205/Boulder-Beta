import { Request, Response } from "express";
import postQueries from "./postQueries";
import { FeedResponse, PostResponse } from "@shared/types";
import { id } from "zod/v4/locales";

const postController = {
  // getPublicFeed: async (req: Request, res: Response) => {
  //   const feed = (await postQueries.getAllPublished()) satisfies PostResponse[];
  //   console.log(typeof feed[0].uploadedAt);
  //   res.json(feed);
  // },

  getFeedPage: async (req: Request, res: Response) => {
    const cursor = req.query.cursor?.length ? req.query.cursor : null;
    const cursorType = req.query.cursorType;
    console.log(cursorType);
    const nextFeedPage = (await postQueries.getFeedPage(
      cursor as string | null,
      cursorType as string | null,
    )) satisfies FeedResponse;
    res.json(nextFeedPage);
  },

  getFollowingPage: async (req: Request, res: Response) => {
    const cursor = req.query.cursor?.length ? req.query.cursor : null;
    const user_id = req.user!.id;
    const nextFeedPage = (await postQueries.getFollowingPage(
      user_id,
      cursor as string | null,
    )) satisfies FeedResponse;
    res.json(nextFeedPage);
  },

  // getFollowingPosts: async (req: Request, res: Response) => {
  //   const user = req.user;
  //   const feed = (await postQueries.getFollowingPosts(
  //     user!.id,
  //   )) satisfies PostResponse[];
  //   res.json(feed);
  // },

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
