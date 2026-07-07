import express from "express";
import attemptController from "./attemptController";
import ownClimbAuth from "@/middleware/ownClimbAuth";
import upload from "@/middleware/multer.middleware";

const attemptRouter = express.Router();

// attemptRouter.post("/:climb_id", ownClimbAuth, attemptController.createAttempt);
attemptRouter.post(
  "/:climb_id",
  ownClimbAuth,
  upload.single("clip"),
  attemptController.createAttempt,
);

export default attemptRouter;
