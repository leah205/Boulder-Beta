import express from "express";
const climb_router = express.Router();
import climbController from "./climbController";
import verifyToken from "@/middleware/authenticateToken";
import validation from "@/middleware/validation";
import upload from "../middleware/multer.middleware";
import ownClimbAuth from "@/middleware/ownClimbAuth";
import parseFormData from "@/middleware/parseFormData";
import attemptController from "@/attempts/attemptController";
//create new climb

//is logged in middleware
climb_router.post(
  "/",
  verifyToken,
  upload.single("picture"),
  validation.logclimb,
  parseFormData,
  climbController.createClimb,
);
climb_router.get(
  "/:climb_id/attempts",
  verifyToken,
  ownClimbAuth,
  climbController.getAttempts,
);

climb_router.get(
  "/:climb_id",
  verifyToken,
  ownClimbAuth,
  climbController.getClimb,
);

climb_router.post(
  "/:climb_id/attempts",
  verifyToken,
  ownClimbAuth,
  parseFormData,
  upload.single("clip"),
  attemptController.createAttempt,
);

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
