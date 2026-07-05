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

// figure out express user type

export default function initialize_app() {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

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

  const corsOptions = {
    origin: ["http://localhost:5173"],
  };

  app.use(cors(corsOptions));

  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.statusCode || 500).json(err.message);
    next();
  });

  return app;
}
