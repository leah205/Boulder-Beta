import request from "supertest";
import { it, describe } from "vitest";
import app from "@/tests/setupTests";
import userRouter from "../userRoutes";
app.use("/api/v1/climbs", userRouter);
import prisma from "@/db/prisma_client";
import config from "@/config";
import jwt from "jsonwebtoken";
import { Application } from "express";

async function createTestUser(username: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  return user.id;
}

const authRequest = (app: Application, id: number, username: string) => {
  const token = jwt.sign(
    {
      id,
      username,
    },
    config.secret,
    { expiresIn: "1d" },
  );

  return {
    get: (url: string) => {
      return request(app).get(url).set("Authorization", `Bearer ${token}`);
    },
    post: (url: string) => {
      return request(app).post(url).set("Authorization", `Bearer ${token}`);
    },
  };
};

describe("GET /users/me/climbs", () => {
  it("inserts and then retrieves climbs", async () => {
    const username = "leah";
    const password = "tiktin";
    const id = await createTestUser(username, password);

    return authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .attach("picture", "./src/assets/climb1.jpg")
      .field("color", "blue")
      .then(() => {
        return authRequest(app, id, username)
          .get("/api/v1/users/me/climbs")
          .expect(200)
          .then((res) => {
            const data = res.body.data;
            console.log(data);
          });
      });
  });
});
