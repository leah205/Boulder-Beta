import express from "express";
const auth_router = express.Router();
import authController from "./authController";
import validation from "../middleware/validation";
import { asyncHandler } from "../Errors";
import verifyToken from "../middleware/authenticateToken";

auth_router.post(
  "/signup",
  validation.signup,
  asyncHandler(authController.signup.post),
);
auth_router.post("/login", asyncHandler(authController.login.post));
auth_router.get("/logout", asyncHandler(authController.logout.get));
auth_router.get(
  "/userFromToken",
  verifyToken,
  asyncHandler(authController.user.get),
);

export default auth_router;
