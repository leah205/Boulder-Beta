import express from "express";
import attemptController from "./attemptController";
import ownClimbAuth from "@/middleware/ownClimbAuth";

const attemptRouter = express.Router();

// attemptRouter.post("/:climb_id", ownClimbAuth, attemptController.createAttempt);
attemptRouter.post("/:climb_id", ownClimbAuth, attemptController.createAttempt);

export default attemptRouter;
