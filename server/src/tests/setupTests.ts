import express from "express";
import session from "express-session";
import config from "@/config";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { beforeEach } from "vitest";
import passport from "@/auth/passport_config";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
import climb_router from "@/climbs/climbRoutes";
import auth_router from "@/auth/auth_routes";
import userRouter from "@/users/userRoutes";
import prisma from "@/db/prisma_client";

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
beforeEach(async () => {
  await prisma.$transaction([
    prisma.climb.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

export default app;
