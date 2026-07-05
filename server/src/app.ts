import express from "express";
import cors from "cors";
import authRouter from "./auth/auth_routes";
import climbRouter from "./climbs/climbRoutes";
import userRouter from "./users/userRoutes";
import passport from "./auth/passport_config";
import prisma from "./db/prisma_client";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./Errors";
import config from "./config";

// figure out express user type
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
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

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/climbs", climbRouter);
app.use("/api/v1/users", userRouter);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.session());

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json(err.message);
  next();
});

app.listen(config.port, () => {
  console.log(`server started on part ${config.port}`);
});
