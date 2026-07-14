import verifyToken from "./authenticateToken";
import type { Request, Response, NextFunction } from "express";
import attemptQueries from "@/attempts/attemptQueries";
import { AppError } from "@/Errors";
import prisma from "@/db/prisma_client";

const ownAttemptAuth = [
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const post_id = Number(req.params.id);
    const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
    });
    if (!post) {
      throw new AppError("post not found", 404);
    }

    const attemptWithUser = await attemptQueries.getAttemptWithUser(
      Number(post.attemptId),
    );
    if (!attemptWithUser) {
      throw new AppError(
        `attempt with id ${post.attemptId} does not exist`,
        404,
      );
    }

    const climbCreatorId = attemptWithUser.climb.creatorId;
    if (!req.user || req.user.id != climbCreatorId) {
      throw new AppError(`User is forbidden to access this resource`, 403);
    }
    //req.climb = climb;
    next();
  },
];

export default ownAttemptAuth;
