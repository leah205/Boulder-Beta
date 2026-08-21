import express, { Router } from "express";
import verifyToken from "@/middleware/authenticateToken";
import postController from "./postController";
import ownPostAuth from "@/middleware/ownPostAuth";

const postRouter = express.Router();

//postRouter.get("/", verifyToken, postController.getPublicFeed);
postRouter.get("/", verifyToken, postController.getFeedPage);
postRouter.get("/following", verifyToken, postController.getFollowingPage);
postRouter.delete("/:id", ownPostAuth, postController.deletePost);
postRouter.get("/:id", verifyToken, postController.getPost);
postRouter.get("/:id/claps", verifyToken, ownPostAuth, postController.getClaps)

export default postRouter;
