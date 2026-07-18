import { Request, Response } from "express";
import userQueries from "./userQueries";
import postQueries from "@/posts/postQueries";
import {
  FollowUserSchema,
  type UserResponse,
  type FollowResponse,
  type ClimbResponse,
  type PostResponse,
} from "@shared/types";

const userController = {
  getMyClimbs: async (req: Request, res: Response) => {
    //filter by visibility with authentication
    //remove when add in authentication
    const id = req.user!.id!;
    const data_obj = (await userQueries.getMyClimbs(
      id,
    )) satisfies ClimbResponse[];
    return res.json(data_obj);
  },

  // getMyPosts: async (req: Request, res: Response) => {
  //   const id = req.user!.id!;
  //   const data_obj = (await postQueries.getPosts(id)) satisfies PostResponse[];
  //   return res.json(data_obj);
  // },

  getFollowing: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data_obj = (await userQueries.getFollowing(
      Number(id),
    )) satisfies FollowResponse[];
    return res.json(data_obj);
  },

  followUser: async (req: Request, res: Response) => {
    req.body = FollowUserSchema.parse(req.body);
    const current_id = req.user!.id;
    const data_obj = await userQueries.followUser(req.body.user_id, current_id);
    return res.json(data_obj);
  },
  unfollowUser: async (req: Request, res: Response) => {
    req.body = FollowUserSchema.parse(req.body);
    const current_id = req.user!.id;
    const data_obj = await userQueries.unfollowUser(
      req.body.user_id,
      current_id,
    );
    return res.json(data_obj);
  },
  getUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data_obj = (await userQueries.getUser(
      Number(id),
    )) satisfies UserResponse;

    return res.json(data_obj);
  },

  getUserPosts: async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const data_obj = (await postQueries.getPosts(
      Number(id),
    )) satisfies PostResponse[];

    return res.json(data_obj);
  },
};

export default userController;
