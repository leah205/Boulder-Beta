import express from "express";
const userRouter = express.Router();
import userController from "./userController";

//create new climb

//get my climbs
userRouter.get("/climbs", userController.getUserClimbs);

export default userRouter;
