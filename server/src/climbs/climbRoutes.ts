import express from "express";
const climb_router = express.Router();
import climbController from "./climbController";

//create new climb

//is logged in middleware
climb_router.post("/", climbController.createClimb);

//get my climbs
climb_router.get("/me", climbController.getMyClimbs);

//climb_router.get("/:id/posted", climb_router.getUserClimbs);

//get all climbs from user, add middleware to verify user is self
// climb_router.get("/:id/all", () =>
//   asyncHandler(climbController.getAllUserClimbs),
// );

export default climb_router;
