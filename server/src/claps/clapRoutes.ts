import express, { Router } from "express";
import verifyToken from "@/middleware/authenticateToken";
import clapController from "./clapController";
// import ownPostAuth from "@/middleware/ownPostAuth";

const clapRouter = express.Router();


clapRouter.post("/:post_id/clap", verifyToken, clapController.postClap)

export default clapRouter;