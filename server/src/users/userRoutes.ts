import express from "express";
const userRouter = express.Router();
import userController from "./userController";

import verifyToken from "@/middleware/authenticateToken";
//create new climb

//get my climbs

//this can stay for now because climbs are not shareable
userRouter.get("/me/climbs", verifyToken, userController.getMyClimbs);

// userRouter.get("/posts/:id", verifyToken, userController.getMyPosts);

userRouter.post("/me/following/follow", verifyToken, userController.followUser);
userRouter.get("/:id/following", verifyToken, userController.getFollowing);
userRouter.post(
  "/me/following/unfollow",
  verifyToken,
  userController.unfollowUser,
);
userRouter.get("/:id", verifyToken, userController.getUser);
userRouter.get("/:id/posts", verifyToken, userController.getUserPosts);

export default userRouter;
