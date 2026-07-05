import config from "@/config";
import jwt from "jsonwebtoken";
import { Application } from "express";
import request from "supertest";

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

export { authRequest };
