import express from "express";
const climb_router = express.Router();
import climbController from "./climbController";

//create new climb
climb_router.post("/", climbController.createClimb);

//climb_router.get("/:id/posted", climb_router.getUserClimbs);

//get all climbs from user, add middleware to verify user is self
// climb_router.get("/:id/all", () =>
//   asyncHandler(climbController.getAllUserClimbs),
// );

export default climb_router;
