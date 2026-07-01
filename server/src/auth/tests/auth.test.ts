import request from "supertest";
import express from "express";
import auth_router from "../auth_routes";
import { beforeEach, it, describe } from "vitest";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
