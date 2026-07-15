import express from "express";
const userRouter = express.Router();
import userController from "./userController";
import verifyToken from "@/middleware/authenticateToken";
//create new climb

//get my climbs
userRouter.get("/me/climbs", verifyToken, userController.getMyClimbs);
userRouter.get("/me/posts", verifyToken, userController.getMyPosts);

export default userRouter;
