import express from "express";
const userRouter = express.Router();
import userController from "./userController";
import verifyToken from "@/middleware/authenticateToken";
//create new climb

//get my climbs
userRouter.get("/me/climbs", verifyToken, userController.getMyClimbs);
userRouter.get("/me/posts", verifyToken, userController.getMyPosts);
userRouter.post("/me/following", verifyToken, userController.followUser);
userRouter.get("/me/following", verifyToken, userController.getFollowing);
userRouter.get("/:id", verifyToken, userController.getUser);

export default userRouter;
