import verifyToken from "@/middleware/authenticateToken";
import express from "express";
import attemptController from "./attemptController";

const attemptRouter = express.Router();

attemptRouter.post("/:climb_id", verifyToken, attemptController.createAttempt);

export default attemptRouter;
