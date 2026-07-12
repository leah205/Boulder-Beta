import express from "express";
import verifyToken from "@/middleware/authenticateToken";
import postController from "./postController";

const postRouter = express.Router();

postRouter.get("/", verifyToken, postController.getPublicFeed);

export default postRouter;
