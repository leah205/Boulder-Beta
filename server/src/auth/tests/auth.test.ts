import request from "supertest";
import { it, describe } from "vitest";
import app from "@/tests/setupTests";

describe("POST /signup", () => {
  it("returns username when user signs up", async () => {
    return request(app)
      .post("/api/v1/auth/signup")
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
      .post("/api/v1/auth/signup")
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
    console.log("second to alst");
    return request(app)
      .post("/api/v1/auth/signup")
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
      .post("/api/v1/auth/signup")
      .type("form")
      .send({
        username: "leah",
        password: "tiktin",
        password_confirm: "tiktin",
      })
      .then(() => {
        return request(app)
          .post("/api/v1/auth/login")
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
      .post("/api/v1/auth/login")
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
      .post("/api/v1/auth/signup")
      .type("form")
      .send({
        username: "leah",
        password: "tiktin",
        password_confirm: "tiktin",
      })
      .then(() => {
        return request(app)
          .post("/api/v1/auth/login")
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
          .post("/api/v1/auth/logout")
          .set("Authorization", `Bearer ${token}`)
          .then((res) => {
            console.log(res);
          });
        // .expect(200)
        // .expect({ logout: "success" });
      });
  });
});
