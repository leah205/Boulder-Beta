import express from "express";
import cors from "cors";
import passport from "@/auth/passport_config";
import prisma from "@/db/prisma_client";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/Errors";
import config from "@/config";
import userRouter from "@/users/userRoutes";
import attemptRouter from "@/attempts/attemptRouter";
import climb_router from "@/climbs/climbRoutes";
import auth_router from "@/auth/auth_routes";
import postRouter from "@/posts/postRoutes";
import { ErrorResponse } from "@shared/types";
import { z } from "zod";
import { ZodError } from "zod";
import beta_router from "@/betas/betaRoutes";

// figure out express user type

export default function initialize_app() {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://boulder-beta.onrender.com",
    ],
  };

  app.use(cors(corsOptions));
  app.use(
    session({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      },
      secret: config.secret,
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }) as unknown as session.Store,
    }),
  );

  app.use(passport.session());
  app.use("/api/v1/auth", auth_router);
  app.use("/api/v1/climbs", climb_router);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/attempts", attemptRouter);
  app.use("/api/v1/posts", postRouter);
  app.use("/api/v1/posts", beta_router);

  app.use(
    (
      err: AppError | Error,
      req: Request<
        Record<string, unknown>,
        ErrorResponse,
        Record<string, unknown>
      >,
      res: Response,
      next: NextFunction,
    ) => {
      if (err instanceof Error && "issues" in err) {
        console.log(err.issues);
        return res.status(400).json("Validation failed");
      }
      const status = err instanceof AppError && err.status ? err.status : 500;
      res.status(status).json({ message: err.message });
    },
  );

  return app;
}
