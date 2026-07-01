import request from "supertest";
import express from "express";
import auth_router from "../auth_routes";
import { beforeEach, it, describe, test } from "vitest";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/v1/api/auth", auth_router);
import prisma from "@/db/prisma_client";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.climb.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

test("post signup route works", (done) => {
  request(app)
    .post("/signup")
    .set("Content-Type", "application/json")
    .send({ username: "leah", password: "tiktin" })
    .expect(function (res) {
      res.body.username = "dave";
    })
    .expect(200, done);
});
