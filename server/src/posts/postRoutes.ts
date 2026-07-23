import express from "express";
import verifyToken from "@/middleware/authenticateToken";
import postController from "./postController";
import ownPostAuth from "@/middleware/ownPostAuth";

const postRouter = express.Router();

postRouter.get("/", verifyToken, postController.getPublicFeed);
postRouter.get("/following", verifyToken, postController.getFollowingPosts);
postRouter.delete("/:id", ownPostAuth, postController.deletePost);
postRouter.get("/:id", verifyToken, postController.getPost);

export default postRouter;
