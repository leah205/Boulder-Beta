import express from "express";
import attemptController from "./attemptController";
import ownClimbAuth from "@/middleware/ownClimbAuth";
import upload from "@/middleware/multer.middleware";
import verifyToken from "@/middleware/authenticateToken";
import ownAttemptAuth from "@/middleware/ownAttemptAuth";

const attemptRouter = express.Router();

// attemptRouter.post("/:climb_id", ownClimbAuth, attemptController.createAttempt);
attemptRouter.post(
  "/:climb_id",
  verifyToken,
  ownClimbAuth,
  upload.single("clip"),
  attemptController.createAttempt,
);

attemptRouter.post(
  "/:attempt_id/publish",
  verifyToken,
  ownAttemptAuth,
  attemptController.publishAttempt,
  // attemptController.createAttempt,
);

export default attemptRouter;
