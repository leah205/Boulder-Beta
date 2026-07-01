import express from "express";
const climb_router = express.Router();
import climbController from "./climbController";
import verifyToken from "@/middleware/authenticateToken";
import validation from "@/middleware/validation";
//create new climb

//is logged in middleware
climb_router.post(
  "/",
  verifyToken,
  validation.logclimb,
  climbController.createClimb,
);

// get all climbs
// climb_router.get("/feed", climb);
// climb_router.get("/clim");

//climb_router.get("/:id/posted", climb_router.getUserClimbs);

//get all climbs from user, add middleware to verify user is self
// climb_router.get("/:id/all", () =>
//   asyncHandler(climbController.getAllUserClimbs),
// );

export default climb_router;
