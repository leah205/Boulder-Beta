import express from "express";
import attemptController from "./attemptController";
import ownClimbAuth from "@/middleware/ownClimbAuth";
import upload from "@/middleware/multer.middleware";
import verifyToken from "@/middleware/authenticateToken";
import ownAttemptAuth from "@/middleware/ownAttemptAuth";
import parseFormData from "@/middleware/parseFormData";
import postController from "@/posts/postController";

const attemptRouter = express.Router();

// attemptRouter.post("/:climb_id", ownClimbAuth, attemptController.createAttempt);
attemptRouter.post(
  "/:climb_id",
  verifyToken,
  ownClimbAuth,
  parseFormData,
  upload.single("clip"),
  attemptController.createAttempt,
);

attemptRouter.post(
  "/:attempt_id/video/post",
  verifyToken,
  ownAttemptAuth,
  postController.postVideo,
  // attemptController.createAttempt,
);

attemptRouter.get(
  "/:attempt_id/video",
  verifyToken,
  ownAttemptAuth,
  attemptController.getVideo,
  // attemptController.createAttempt,
);

export default attemptRouter;
