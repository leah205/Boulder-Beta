import express from "express";
const auth_router = express.Router();
import authController from "./authController";
import validation from "../middleware/validation";
import verifyToken from "../middleware/authenticateToken";

auth_router.post("/signup", validation.signup, authController.signup.post);
auth_router.post("/login", authController.login.post);
auth_router.post("/logout", authController.logout.post);
auth_router.get("/userFromToken", verifyToken, authController.user.get);

export default auth_router;
