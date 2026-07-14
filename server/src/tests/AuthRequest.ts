import config from "@/config";
import jwt from "jsonwebtoken";
import { Application } from "express";
import request from "supertest";

export default class AuthRequest {
  token: string;
  app: Application;
  constructor(app: Application, id: number, username: string) {
    this.token = this.createToken(id, username);
    this.app = app;
  }

  get(url: string) {
    return request(this.app)
      .get(url)
      .set("Authorization", `Bearer ${this.token}`);
  }
  post(url: string) {
    return request(this.app)
      .post(url)
      .set("Authorization", `Bearer ${this.token}`);
  }
  delete(url: string) {
    return request(this.app)
      .delete(url)
      .set("Authorization", `Bearer ${this.token}`);
  }

  createToken(id: number, username: string) {
    const token = jwt.sign(
      {
        id,
        username,
      },
      config.secret,
      { expiresIn: "1d" },
    );
    return token;
  }
}
