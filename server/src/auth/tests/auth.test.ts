import request from "supertest";
import express from "express";
import auth_router from "../auth_routes";
import session from "express-session";
import config from "@/config";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { beforeEach, it, describe } from "vitest";
import passport from "../passport_config";
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

describe("POST /signup", () => {
  it("returns username when user signs up", () => {
    return request(app)
      .post("/signup")
      .type("form")
      .send({
        username: "leah",
        password: "tiktin",
        password_confirm: "tiktin",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.username).toEqual("leah");
      });
  });

  it("returns errors when fields are empty", () => {
    return request(app)
      .post("/signup")
      .type("form")
      .send({
        username: "leah",
        password: "",
        password_confirm: "",
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toHaveLength(2);
      });
  });

  it("returns errors when password does not match confirm password field", () => {
    return request(app)
      .post("/signup")
      .type("form")
      .send({
        username: "leah",
        password: "holla",
        password_confirm: "hello",
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toHaveLength(1);
      });
  });
});

describe("POST /login", () => {
  it("returns username when user logs in with correct credentials", () => {
    return request(app)
      .post("/signup")
      .type("form")
      .send({
        username: "leah",
        password: "tiktin",
        password_confirm: "tiktin",
      })
      .then(() => {
        return request(app)
          .post("/login")
          .send({
            username: "leah",
            password: "tiktin",
          })
          .expect(200)
          .then((res) => {
            expect(res.body.username).toEqual("leah");
            expect(res.body).toHaveProperty("token");
          });
      });
  });

  it("returns error when user does not exist", () => {
    return request(app)
      .post("/login")
      .send({
        username: "leah",
        password: "tiktin",
      })
      .expect(400)
      .then((res) => {
        console.log(res.body);
        expect(res.body.message).toEqual("Username not registered");
      });
  });
});

describe("user token authenication", () => {
  it("gets user from token", () => {
    let token = "";
    return request(app)
      .post("/signup")
      .type("form")
      .send({
        username: "leah",
        password: "tiktin",
        password_confirm: "tiktin",
      })
      .then(() => {
        return request(app)
          .post("/login")
          .send({
            username: "leah",
            password: "tiktin",
          })
          .expect(200)
          .then((res) => {
            expect(res.body.username).toEqual("leah");
            expect(res.body).toHaveProperty("token");
            token = res.body.token;
          });
      })
      .then(() => {
        return request(app)
          .post("/logout")
          .set("Authorization", `Bearer ${token}`)
          .expect(200)
          .expect({ logout: "success" });
      });
  });
});
