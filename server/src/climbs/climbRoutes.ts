import express from "express";
const climb_router = express.Router();
import climbController from "./climbController";
import verifyToken from "@/middleware/authenticateToken";
import validation from "@/middleware/validation";
import upload from "../middleware/multer.middleware";
//create new climb

//is logged in middleware
climb_router.post(
  "/",
  verifyToken,
  upload.single("picture"),
  validation.logclimb,
  climbController.createClimb,
);
//TO DO
climb_router.get("/:id/attempts", verifyToken, climbController.getAttempts);

//TO DO
// climb_router.patch(
//   "/:id",
//   verifyToken,
//   validation.logclimb,
//   climbController.patchClimb,
// );

// get all climbs
// climb_router.get("/feed", climb);
// climb_router.get("/clim");

//climb_router.get("/:id/posted", climb_router.getUserClimbs);

//get all climbs from user, add middleware to verify user is self
// climb_router.get("/:id/all", () =>
//   asyncHandler(climbController.getAllUserClimbs),
// );

export default climb_router;
