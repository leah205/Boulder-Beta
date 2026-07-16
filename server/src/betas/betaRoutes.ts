import verifyToken from "@/middleware/authenticateToken";
import express from "express";
import betaController from "./betaController";
const beta_router = express.Router();
import validation from "@/middleware/validation";

beta_router.post(
  "/:post_id/betas",
  verifyToken,
  validation.createBeta,
  betaController.createBeta,
);

export default beta_router;
