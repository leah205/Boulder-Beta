import express from "express";
import session from "express-session";
import config from "@/config";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { beforeEach } from "vitest";
import passport from "@/auth/passport_config";
import auth_router from "@/auth/auth_routes";
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

app.use("/", auth_router);
import prisma from "@/db/prisma_client";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.climb.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

export default app;
