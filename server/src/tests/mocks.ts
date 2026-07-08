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

// const authRequest = (app: Application, id: number, username: string) => {
//   const token = jwt.sign(
//     {
//       id,
//       username,
//     },
//     config.secret,
//     { expiresIn: "1d" },
//   );

//   const auth_request = {
//     get: (url: string, token_string) => {
//       return request(app).get(url).set("Authorization", `Bearer ${token}`);
//     },
//     post: (url: string, token: string) => {
//       return request(app).post(url).set("Authorization", `Bearer ${token}`);
//     },
//   };

//   return {
//     auth_request,
//     token,
//   };
// };

export { authRequest };
